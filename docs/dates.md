# Date Functions

Functions for working with dates.

## utcYmdToDate

> 
```js
utcYmdToDate(str)
```



### Parameters

| Name | Type | Required | Description                                                                                                                                                                  |
| ---- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| str  |      | yes      | A date string expected to be in the format `[year]-[month]-[day]T[hour]:[min]:[sec]:[ms]` in 24 hour UTC time
 - you may omit the entire timestamp, just don't include the T |