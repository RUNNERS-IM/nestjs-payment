// import { AdminModule } from '@adminjs/nestjs';
// import { ConfigModule, ConfigService } from '@nestjs/config';
//
// import { userResource } from '../modules/user/admins/user.resource';
// import kr from './locale/kr';
//
// export const adminjsModule = AdminModule.createAdminAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => ({
//     adminJsOptions: {
//       rootPath: '/admin',
//       resources: [userResource],
//       // resources: [UserEntity],
//       locale: kr,
//       branding: {
//         companyName: `${config.get('SERVICE_TITLE')} | ${config.get('COMPANY_TITLE')}`,
//         softwareBrothers: false,
//         // logo: '',
//         // favicon: '',
//       },
//     },
//     auth: {
//       async authenticate(email, password) {
//         if (email === config.get('ADMIN_USERNAME') && password === config.get('ADMIN_PASSWORD')) {
//           return Promise.resolve({ email, password });
//         }
//       },
//       cookieName: config.get('COOKIE_NAME') || 'labcode',
//       cookiePassword: config.get('COOKIE_PASSWORD') || 'labcode_password',
//     },
//   }),
// });
