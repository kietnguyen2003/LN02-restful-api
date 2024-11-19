const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Đường dẫn đến file .proto của bạn
const PROTO_PATH = 'src/hero/hero.proto';

// Tải file .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Tạo đối tượng gRPC từ file .proto
const heroProto = grpc.loadPackageDefinition(packageDefinition).hero;

// Tạo client gRPC
const client = new heroProto.HeroesService(
  'localhost:5000',
  grpc.credentials.createInsecure(),
);

// Test phương thức `FindOne`
function testFindOne() {
  const request = { id: 1 };

  client.FindOne(request, (error, response) => {
    // phương thức FindOne được định nghĩa trong .proto
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('FindOne Response:', response);
    }
  });
}

// Gọi các hàm test
testFindOne();
