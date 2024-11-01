'use client';

import {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from '@headlessui/react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';

import { useKakaoKeywordQuery } from '../queries';
import type { IntroSearchEngine, KaKaoKeywordDocument } from '../types';

type ComboboxValue = KaKaoKeywordDocument | google.maps.places.AutocompletePrediction | null;

interface IntroLocationSearchProps {
  engine: IntroSearchEngine;
  setIsAddress: (value: boolean) => void;
}

// value 프롭의 타입이 고정되어 버려서 직접 타입 지정해서 커스터마이징
const TypedCombobox = HeadlessCombobox as unknown as (
  props: React.ComponentProps<typeof HeadlessCombobox> & { value: ComboboxValue },
) => JSX.Element;

function ComboBox({ engine, setIsAddress }: IntroLocationSearchProps) {
  const { setValue } = useFormContext();

  const [googlePlaces, setGooglePlaces] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [selectedPlaceKakao, setSelectedPlaceKakao] = useState<KaKaoKeywordDocument | null>(null);
  const [selectedPlaceGoogle, setSelectedPlaceGoogle] =
    useState<google.maps.places.AutocompletePrediction | null>(null);
  const [query, setQuery] = useState('');

  const { data: kakaoKeywordResults } = useKakaoKeywordQuery({ value: query, engine });
  const places = useMapsLibrary('places');

  const handleCloseCombobox = () => {
    setQuery('');
  };

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;
    if (!placeAutocomplete) return;
    const result = await placeAutocomplete.getPlacePredictions({ input: event.target.value });
    setGooglePlaces(result.predictions);
    setQuery(event.target.value);
  };

  const handleChangeCombobox = (
    value: google.maps.places.AutocompletePrediction | KaKaoKeywordDocument | null,
  ) => {
    if (!value) return;
    if ('place_id' in value && engine === 'GOOGLE') {
      setSelectedPlaceGoogle(value);
    } else if ('id' in value && engine === 'KAKAO') {
      setSelectedPlaceKakao(value);
    }
  };

  const value: ComboboxValue = useMemo(() => {
    if (!selectedPlaceKakao && !selectedPlaceGoogle) return null;
    return engine === 'KAKAO' ? selectedPlaceKakao : selectedPlaceGoogle;
  }, [engine, selectedPlaceKakao, selectedPlaceGoogle]);

  useEffect(() => {
    if (!places || !inputRef.current) return;
    setPlaceAutocomplete(new places.AutocompleteService());
  }, [places]);

  useEffect(() => {
    if (selectedPlaceGoogle) {
      console.log(selectedPlaceGoogle);
      setValue('invitation.location.address', selectedPlaceGoogle.description);
      setValue('invitation.location.roadAddress', '');
      setValue('invitation.location.coord.0', 0);
      setValue('invitation.location.coord.1', 0);
      setValue('invitation.location.placeName', selectedPlaceGoogle.terms[0].value);
      setValue('invitation.location.placeDetail', '');
      setIsAddress(false);
    }
  }, [selectedPlaceGoogle, setValue, setIsAddress]);

  useEffect(() => {
    if (selectedPlaceKakao) {
      setValue('invitation.location.address', selectedPlaceKakao.address_name);
      setValue('invitation.location.roadAddress', selectedPlaceKakao.road_address_name);
      setValue('invitation.location.coord.0', selectedPlaceKakao.x);
      setValue('invitation.location.coord.1', selectedPlaceKakao.y);
      setValue('invitation.location.placeName', selectedPlaceKakao.place_name);
      setValue('invitation.location.placeDetail', '');
      setIsAddress(false);
    }
  }, [selectedPlaceKakao, setValue, setIsAddress]);

  return (
    <TypedCombobox value={value} onChange={handleChangeCombobox} onClose={handleCloseCombobox}>
      <div className="relative">
        <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
          <div className="flex flex-none items-center">
            <IoSearchOutline className="ml-4 text-xl text-slate-400" />
          </div>
          <ComboboxInput
            className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
            spellCheck={false}
            autoComplete="off"
            placeholder="예식장 이름이나 주소를 검색해주세요."
            type="text"
            displayValue={() => ''}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <div className="flex flex-none items-center" />
        </label>
        <ComboboxOptions
          portal={false}
          modal={false}
          transition
          className="absolute top-14 z-10 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white text-sm shadow-xl"
          as="ul"
        >
          <ul className="divide-y divide-slate-100">
            {engine === 'GOOGLE' &&
              googlePlaces.map((place) => (
                <ComboboxOption key={place.place_id} value={place} as="li">
                  <button
                    type="button"
                    className="relative w-full px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <p>{place.description.split(',')[0]}</p>
                    <p className="text-slate-400">{place.description}</p>
                    <HiOutlineLocationMarker className="absolute top-0 bottom-0 right-4 m-auto text-lg text-slate-300" />
                  </button>
                </ComboboxOption>
              ))}
            {engine === 'KAKAO' &&
              kakaoKeywordResults?.documents.map((document) => (
                <ComboboxOption key={document.id} value={document} as="li">
                  <button
                    type="button"
                    className="relative w-full px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <p>{document.place_name}</p>
                    <p className="text-slate-400">{document.address_name}</p>
                    <HiOutlineLocationMarker className="absolute top-0 bottom-0 right-4 m-auto text-lg text-slate-300" />
                  </button>
                </ComboboxOption>
              ))}
          </ul>
        </ComboboxOptions>
      </div>
    </TypedCombobox>
  );
}

const IntroSearchAddress = memo(ComboBox);
export default IntroSearchAddress;
