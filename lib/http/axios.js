let instance = {
  baseURL: process.env.DATA_SERVICE_ENDPOINT,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
let instance_socket_io = {
  baseURL: process.env.SOCKET_IO,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
let instance_mapReduce = {
  baseURL: process.env.MAPREDUCE_URL,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
let user_instance = {
  baseURL: process.env.USERS_DATA_SERVICE_ENDPOINT,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
let room_instance = {
  baseURL: process.env.ROOMS_DATA_SERVICE_ENDPOINT,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
let common_instance = {
  baseURL: process.env.COMMON_DATA_SERVICE_ENDPOINT,
  timeout: 50000000,
  headers: { "Content-Type": "application/json" }
};
module.exports = {
  instance,
  instance_socket_io,
  instance_mapReduce,
  user_instance,
  room_instance,
  common_instance
};
