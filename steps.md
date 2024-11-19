# Hướng dẫn cấu hình và sử dụng gRPC trong NestJS
**npm i --save @nestjs/microservices @grpc/grpc-js @grpc/reflection @grpc/proto-loader**

## Bước 1: Tạo file `.proto`
- Sử dụng **syntax proto3**.
- Đặt tên gói `package` (ví dụ: **hero**).
- Định nghĩa các `service` (ví dụ: lấy ra 1 **Hero** thông qua **Id**):
  - **HeroById** là **Request** gửi đến.
  - **Hero** là **Response** gửi về.
- Định nghĩa các thuộc tính của **Response** và **Request**.

## Bước 2: Cấu hình gRPC client
- Tạo file `client.ts` trong thư mục `src`.
- Xuất ra **GrpcOptions**: đây là kiểu dữ liệu để cấu hình giao thức gRPC.
- Cấu hình:
  - **transport**: `Transport.GRPC` => chỉ định sử dụng giao thức gRPC.
  - Các thuộc tính của `options`:
    - **package**: `'hero'` (tên package được định nghĩa trong file `.proto`).
    - **protoPath**: đường dẫn đến file `.proto`.
  - Thêm `onLoadPackageDefinition` Callback để sử dụng **ReflectionService**:
    - Đây là callback được gọi sau khi `protoPath` được tải và parsed.
    - `ReflectionService(pkg).addToServer(server)`:
      - Thêm dịch vụ Reflection vào server gRPC.
      - **Reflection** cho phép client khám phá các service/method mà không cần tải file `.proto` trước.
      - Nếu không có Reflection, client cần biết trước file `.proto`. Nếu có Reflection, client có thể tự động khám phá service.

## Bước 3: Cấu hình Microservice trong `main.ts`
- Thêm đoạn sau để khởi chạy server của Microservice:
  ```typescript
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
- Để khởi chạy server của Microservice.

## **Bước 4: Xử Lý Service và Controller**

1. **Định nghĩa interface service gRPC**  
   Tạo interface để xác định các method gRPC mà service sẽ cung cấp.  
   ```typescript
   interface HeroesService {
     findOne(data: HeroById): Observable<Hero>;
   }
2. **Tạo controller cho các package hero**
3. **Inject client gRPC đã đăng ký trong moduleo**
    Được gọi khi module được khởi tạo, kết nối client với service gRPC
    ```typescript
    onModuleInit() {
      this.heroesService = this.client.getService<HeroesService>('HeroesService');
    }
4. **Xử lý method gRPC findOne từ service HeroesService**
    ```typescript
    @GrpcMethod('HeroesService')
    findOne(data: HeroById): Hero {
      return this.items.find(({ id }) => id === data.id);
    }

## **Bước 5: Tạo module**
- Đăng ký client có name: 'HERO_PACKAGE'
- Sau đó truyền toàn bồ cấu hình của grpcClientOptions Vào
- Đăng ký controller

## **Bước 6:  start server**
- Start server NestJs (npm run start) sau đó start nodejs (node test-client) để test
- Thêm vào nest-cli.json
"compilerOptions": {
    "deleteOutDir": true,
    "assets": [
      "**/*.proto"
    ],
    "watchAssets": true
  }
- Sửa port của data base lại