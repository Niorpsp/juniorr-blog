// ใช้ axios สำหรับส่ง Request ไปยัง API
import axios from "axios";

// สร้าง axios instance
// เพื่อเก็บ Base URL ของ Server
// เวลาจะเรียก API จะได้ไม่ต้องเขียน URL ซ้ำทุกครั้ง
const postsApi = axios.create({
    baseURL: "https://blog-post-project-api.vercel.app",
});

// ส่งออก axios instance
// เพื่อให้ไฟล์อื่นสามารถ import ไปใช้งานได้
export default postsApi;