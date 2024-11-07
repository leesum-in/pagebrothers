import { AuthWrapper, SocialLoginButton } from '@/www/auth';
import { SOCIAL_LOGIN_TYPES } from '@/www/auth/types';

function LogInTemplate(): React.ReactNode {
  return (
    <AuthWrapper type="login">
      <div className="mt-8">
        <ul className="space-y-2 font-bold">
          {SOCIAL_LOGIN_TYPES.map((type) => (
            <li key={type}>
              <SocialLoginButton type={type} />
            </li>
          ))}
        </ul>
      </div>
    </AuthWrapper>
  );
}

export default LogInTemplate;
