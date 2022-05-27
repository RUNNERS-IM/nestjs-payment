// Nestjs
import { ConfigModule, ConfigService } from '@nestjs/config';

// Adminjs
import { AdminModule } from '@adminjs/nestjs';

// Locale
import kr from './locale/kr';

// Resource
import { userResource } from '../modules/user/admins/user.resource';
import { paymentResource } from '../modules/payment/admins/payment.resource';
import { paymentCancelResource } from '../modules/payment/admins/payment-cancel.resource';
import { paymentPrepareResource } from '../modules/payment/admins/payment-prepare.resource';
import { cardResource } from '../modules/card/admins/card.resource';

// Main section
export const adminjsModule = AdminModule.createAdminAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [
        // User
        userResource,
        // Payment
        paymentResource,
        paymentCancelResource,
        paymentPrepareResource,
        // Card
        cardResource,
      ],
      locale: kr,
      branding: {
        companyName: `${config.get('SERVICE_TITLE')} | ${config.get('COMPANY_TITLE')}`,
        softwareBrothers: false,
        // logo: '',
        // favicon: '',
      },
    },
    auth: {
      async authenticate(email, password) {
        if (email === config.get('ADMIN_USERNAME') && password === config.get('ADMIN_PASSWORD')) {
          return Promise.resolve({ email, password });
        }
      },
      cookieName: config.get('COOKIE_NAME') || 'cookieName',
      cookiePassword: config.get('COOKIE_PASSWORD') || 'cookiePassword',
    },
  }),
});
