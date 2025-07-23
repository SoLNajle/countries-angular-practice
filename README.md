# Countries I've Travelled

To practice reactiveforms in Angular

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

```bash
json-server --watch db/db.json --port 3000
```

this will create these endpoints from [`db.json`](./db/db.json) file
```
[1] http://localhost:3000/countries
[1] http://localhost:3000/users
```
OR

* To run everything using concurrently use
``` 
npm run start-all
```