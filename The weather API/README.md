# INFSCI2560 Activity 8

This week you are going to expand the weather app I demonstrated in class to support windchill and the daily weather summary. Currently the app returns the temperature when given a zipcode as the URL path `/<zipcode`. You need to *version* this API and create a version 2 that has three endpoints, `/v2/temp/<zipcode>`, `/v2/windchill/<zipcode>`, and `/v2/description/<zipcode>`

Read the [OpenWeatherMap JavaScript Library documentation](https://www.npmjs.com/package/openweather-apis) and the [OpenWeatherMap One Call API](https://openweathermap.org/api/one-call-api) for help on the structure of the JSON data you will get from the `openweather-apis` module in the code.

## Your Task

1. Get an API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up). You need to register with an email
2. Add your API key to the `.env` file. For help visit the [Glitch Documentation](https://glitch.com/help/env/) and watch the video.
3. Test to make sure the app works with your API key by using the v1 api (i.e. putting in a zip code)
4. Modify `server.js` to use the current api at endpoints starting with `/v1`
4. Create a new routing file for version 2 of the API called `apiv2.js`
5. Modify `server.js` to `require` the v2 route file and add a route `/v2` to use that file
  * HINT: Look at how the version 1 route file is added to `server.js`
6. Modify your new routing file (`apiv2.js`) to add new routes in the version 2  specification below. 
  * HINT: You will need to modify the regular expression t add `/<endpoint>` to the beginning of the route
7. You will need to access different pieces of information from the [OpenWeatherMap API library](https://github.com/CICCIOSGAMINO/openweather-apis) in your request handlers.
  * HINT: You can copy your the v1 handler method and modify the URL pattern match for the new URL endpoints.
  * HINT: Look at the JSON example in the [OpenWeatherMap one call API](https://openweathermap.org/api/one-call-api) to see the format of all the data that comes back and how you might return only pieces of it.


## Version 2 API Specification

### Get Temperature

Get the current temperature at the specified zip code.

**URL** : `/v2/temp/:zip`

**Method** : `GET`


##### Success Response

**Code** : `200 OK`

**Content examples**

For a request `GET /v2/temp/15207`

```json
{
  "zipcode":"15207",
  "temperature":32.55
}
```

### Get Windchill

Get the current windchill at the specified zip code. Windchill is called "feels like" in the OpenWeatherAPI specification.

**URL** : `/v2/windchill/:zip`

**Method** : `GET`


##### Success Response

**Code** : `200 OK`

**Content examples**

For a request `GET /v2/windchill/15207`

```json
{
  "zipcode":"15207",
  "windchill":-270
}
```


### Get Description

Get the human description of the weather at the specified zip code. The description can be accessed as part of the the [OpenWeatherMap API One Call API](https://openweathermap.org/api/one-call-api).

**URL** : `/v2/description/:zip`

**Method** : `GET`


##### Success Response

**Code** : `200 OK`

**Content examples**

For a request `GET /v2/description/15207`

```json
{
  "zipcode":"15207",
  "forecast": "Cloudy with a chance of meatballs."
}
```




Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
