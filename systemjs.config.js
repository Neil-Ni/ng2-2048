(function(global) {
  var map = {
    'app':                        'app',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    '@ngrx':                      'node_modules/@ngrx'
  };

  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    '@angular/common':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/compiler':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/core':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/http':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser-dynamic':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/router':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/router-deprecated':            { main: 'index.js', defaultExtension: 'js' },
    '@angular/upgrade':            { main: 'index.js', defaultExtension: 'js' },
    '@ngrx/core':                 { main: 'index.js', format: 'cjs' },
    '@ngrx/store':                { main: 'index.js', format: 'cjs' }
  };

  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
