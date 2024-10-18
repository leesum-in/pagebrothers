'use client';

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import type { NoInfer } from '@tanstack/react-query';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';

import type { KaKaoKeywordDocument, KakaoKeywordResponse } from '@/invitations/types';

interface IntroLocationSearchProps {
  selectedPlaceKakao?: KaKaoKeywordDocument | null;
  selectedPlaceGoogle?: google.maps.places.AutocompletePrediction[] | null;
  engine: 'KAKAO' | 'GOOGLE';
  onPlaceSelect: (place: google.maps.places.AutocompletePrediction[] | null) => void;
  kakaoKeywordResults: KakaoKeywordResponse | null | undefined;
  handleChangeCombobox: (
    value:
      | NoInfer<google.maps.places.AutocompletePrediction[] | null>
      | KaKaoKeywordDocument
      | null,
  ) => void;
  handleCloseCombobox: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function IntroComboBox({
  selectedPlaceKakao,
  selectedPlaceGoogle,
  kakaoKeywordResults,
  engine,
  onPlaceSelect,
  handleCloseCombobox,
  handleChangeCombobox,
  handleSearch,
}: IntroLocationSearchProps) {
  const places = useMapsLibrary('places');

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!placeAutocomplete) return;
    const result = await placeAutocomplete.getPlacePredictions({ input: event.target.value });
    onPlaceSelect(result.predictions);
    handleSearch(event);
  };

  useEffect(() => {
    if (!places || !inputRef.current) return;

    setPlaceAutocomplete(new places.AutocompleteService());
  }, [places]);

  return (
    <Combobox
      value={engine === 'KAKAO' ? selectedPlaceKakao : selectedPlaceGoogle}
      onChange={handleChangeCombobox}
      onClose={handleCloseCombobox}
    >
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
            {selectedPlaceGoogle?.map((place) => (
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
            {kakaoKeywordResults?.documents.map((document) => (
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
    </Combobox>
  );
}

export default IntroComboBox;
