import StartButton from './StartButton';

function StartTemplate() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <div className="flex flex-1 flex-col gap-4 p-4 desktop:flex-row desktop:gap-8 desktop:p-8 ">
        <div className="desktop:flex-1 ">
          <div className="mx-auto w-full max-w-[26rem]">
            <div className="mx-auto w-full max-w-md space-y-8 py-4">
              <header>
                <p className="text-lg font-bold">💍 호스트 정보 입력</p>
                <p className="text-sm text-slate-400">
                  미리 잘 입력해두면 청첩장 편집이 편리해져요.
                </p>
              </header>

              <StartButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartTemplate;
