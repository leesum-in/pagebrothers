function WidgetModalFooter(): React.ReactNode {
  return (
    <>
      <button
        type="button"
        className="h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
      >
        미리보기
      </button>
      <button
        type="submit"
        className="h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
      >
        적용하기
      </button>
    </>
  );
}

export default WidgetModalFooter;
