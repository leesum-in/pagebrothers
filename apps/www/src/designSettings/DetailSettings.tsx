export default function DetailSettings() {
  return (
    <form className="p-4 desktop:p-6">
      <ul className="space-y-4">
        <li className="flex items-center gap-4">
          <div className="space-y-2 flex-1">
            <div>
              <div className="flex items-center justify-between text-slate-600">
                <div className="font-bold">사진 영역 확대 방지</div>
                <div className="text-sm" />
              </div>
              <div className="text-sm text-slate-400">
                눈이 좋지 않은 분들을 위해 텍스트 영역은 확대할 수 있어요.
              </div>
            </div>
          </div>
        </li>
        <hr className="border-t border-slate-200" />
        <li className="space-y-1">
          <p className="font-bold">호스트 표기 순서</p>
          <div className="center-flex h-10 gap-2 rounded-lg border border-slate-200 bg-slate-100 p-1">
            <div
              role="button"
              tabIndex={0}
              aria-disabled="false"
              aria-roledescription="sortable"
              aria-describedby="DndDescribedBy-7"
              className="center-flex h-8 flex-1 touch-none gap-1 rounded-md border border-slate-200 bg-white text-sm font-bold"
              style={{ zIndex: 'auto' }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                className="rotate-90 text-slate-400"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />
              </svg>
              <span className="text-slate-700">신랑</span>
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-disabled="false"
              aria-roledescription="sortable"
              aria-describedby="DndDescribedBy-7"
              className="center-flex h-8 flex-1 touch-none gap-1 rounded-md border border-slate-200 bg-white text-sm font-bold"
              style={{ zIndex: 'auto' }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                className="rotate-90 text-slate-400"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />
              </svg>
              <span className="text-slate-700">신부</span>
            </div>
            <div id="DndDescribedBy-7" style={{ display: 'none' }}>
              To pick up a draggable item, press the space bar. While dragging, use the arrow keys
              to move the item. Press space again to drop the item in its new position, or press
              escape to cancel.
            </div>
            <div
              id="DndLiveRegion-7"
              role="status"
              aria-live="assertive"
              aria-atomic="true"
              style={{
                position: 'fixed',
                width: '1px',
                height: '1px',
                margin: '-1px',
                border: '0px',
                padding: '0px',
                overflow: 'hidden',
                clip: 'rect(0px, 0px, 0px, 0px)',
                clipPath: 'inset(100%)',
                whiteSpace: 'nowrap',
              }}
            />
          </div>
        </li>
      </ul>
    </form>
  );
}
