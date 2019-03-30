const HTTP_STATUS = {
  200: {
    status: "200",
    message: "Success",
  },
  400: {
    status: "400",
    message: "Bad Request",
  },
  401: {
    status: "401",
    message: "Unauthorized, Try logging in again",
  },
  403: {
    status: "403",
    message: "Forbidden",
  },
  404: {
    status: "404",
    message: "Not Found",
  },
  500: {
    status: "500",
    message: "Internal Server Error",
  },
};

const COMMANDS = [
  { emoji: "🍕", name: "pizza" },
  { emoji: "🍺", name: "beer" },
  { emoji: "💩", name: "poo" },
  { emoji: "✅", name: "tick" },
  { emoji: "👍", name: "thumbs" },
  { emoji: "👋", name: "bye" },
  { emoji: "👂", name: "listen" },
];

const CASE_STATUS = {
  OPEN: 0,
  CLOSED: 1,
};

const HERO_STATUS = {
  IDLE: 0,
  ACTIVE: 1,
}

const DRIVER_STATUS = {
  SAFE: 0,
  NOT_SAFE: 1,
}

const CLIENT = {
  DRIVER: 0,
  HERO: 1,
}

module.exports = {
  HTTP_STATUS,
  CASE_STATUS,
  HERO_STATUS,
  DRIVER_STATUS,
  COMMANDS,
  CLIENT,
}