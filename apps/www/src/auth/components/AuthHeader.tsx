interface LogInHeaderProps {
  type: 'login' | 'register';
}

function AuthHeader({ type }: LogInHeaderProps): React.ReactNode {
  return (
    <header className="text-center">
      <h1 className="text-2xl font-bold whitespace-pre-wrap">
        {type === 'login' ? `비밀번호 없이\n간편하게 로그인하기` : '회원가입'}
      </h1>
      <p className="mt-2 text-slate-400">
        {type === 'login'
          ? '원하는 로그인 방법을 선택해주세요!'
          : '회원가입 후, 다음 단계를 진행해주세요.'}
      </p>
    </header>
  );
}

export default AuthHeader;
