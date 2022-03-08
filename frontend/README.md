This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



------


# ASAPP Front End Challenge

In these files, you'll find the API needed to work on the ASAPP Front End
Challenge. You should have an email with the challenge details.

To run the API you'll need a version of Node and NPM with `npx` (Node 8+). Then
run `api-server` (for a \*nix like environment) or `api-server.bat` (for
Windows).

Once that the server starts, it will be listening at http://localhost:3030

The API reference is also available at http://localhost:3030/help

> **Note:** This API was created for the challenge, and is not a battle-tested
> production API. If you find a bug or issue that prevents you from doing the
> challenge contact us as soon as possible.

---
# Cities API

* [GET /cities](#get-cities)
* [GET /cities/:id](#get-citiesid)
* [GET /preferences/cities](#get-preferencescities)
* [PATCH /preferences/cities](#patch-preferencescities)

### GET /cities

Returns the list of cities. It uses Offset-Limit pagination.

The list was obtained from https://datahub.io/core/world-cities

The server returns the data sorted by city name.

#### Query Parameters

- **offset**: the index where to start the page (minimum value 0).
- **limit**: the number of items to return (minimum value 1).
- **filter**: a string to filter the cities. The filtering implementation is
  very limited, it doesn't do any stemming or fuzzy search. It simply does a
  case insensitive search on name, county and subcountry.

#### Response

```typescript
type ApiResponse = {
  data: CityInfo[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
  filter?: string;
};

type CityInfo = {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
};
```

- **data** is an array with the request results. By default results are limited
  to 10 items.
- **links** contain links to the first, next, previous, last pages. If there
  aren't next or previous pages the links are undefined.
- **filter** repeats the filter parameter given in the query string to indicate
  that the result is filtered.
- **total** the total number items available (`data.length <= total`)

City information:

- **geonameid** is a unique identifier that comes from the original data set.
- The name **subcountry** comes from the original data set, and it represents a
  State or Province inside the country. Some cities don't have a subcountry
  (e.g. Monaco).

### GET /cities/:id

Returns the city name information for the given city id.

#### Response

```typescript
type CityInfo = {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
};
```

### GET /preferences/cities

Returns the cities selected by the user.

#### Query Parameters

- **offset**: the index where to start the page (minimum value 0)
- **limit**: the number of items to return (minimum value 1)

#### Response

```typescript
type PreferredCitiesResponse = {
  data: number[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
};
```

- **data** is an array with the **geonameid** of each selected city.
- **total** and **links** follows the same pagination patterns as `GET /cities`.

### PATCH /preferences/cities

Modifies the preferred cities.

#### Request Payload

An object where each property key is a city id, and each value is a boolean
indicating if the city is selected or not.

```typescript
type PreferredCitiesPatch = {
  [string]: boolean;
};
```

#### Response

Empty. It returns the 204 status code on success.
