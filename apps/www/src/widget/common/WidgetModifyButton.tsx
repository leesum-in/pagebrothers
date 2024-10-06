import { Button } from '@repo/shared';

function WidgetModifyButton(): React.ReactNode {
  return (
    <Button
      variants="fill_white"
      size="small"
      className="bg-slate-100 hover:bg-slate-200 transition-colors drop-shadow-none"
    >
      위젯 수정
    </Button>
  );
}

export default WidgetModifyButton;
