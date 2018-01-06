import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
        .then(() => {
          if ('serviceWorker' in navigator ) {
            navigator.serviceWorker
              .register('/sw.js')
                .then(() => console.log('Service Worker Registered!'))
                .catch(err => console.log(err));
          }
        });
