# Active Interval

A small tool to make interval which stop when the web browser's document is inactive.
https://www.npmjs.com/package/active-interval

## Installation

```
$ npm install active-interval --save
```

## Usage

```
import { ActiveInterval } from 'active-interval';
ai: ActiveInterval = new ActiveInterval();
this.ai.setInterval(() => {
    console.log(+new Date())
}, 2500, true);
```