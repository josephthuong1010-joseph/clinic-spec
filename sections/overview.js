/* sections/overview.js — Tổng quan hệ thống + Phân hệ M01-M09 */

window.SECTION_OVERVIEW = `
<section class="section" id="overview">
  <div class="sh"><span class="sh-ic">📌</span><div class="sh-txt"><h2>Tổng quan hệ thống</h2><p>ClinicCare — hệ thống quản lý phòng khám ngoại trú tích hợp telehealth</p></div></div>

  <div class="sum-bar">
    <div class="sum-item"><div class="n">9</div><div class="l">Phân hệ</div></div>
    <div class="sum-item"><div class="n">24</div><div class="l">Yêu cầu chức năng</div></div>
    <div class="sum-item"><div class="n">12</div><div class="l">Yêu cầu phi chức năng</div></div>
    <div class="sum-item"><div class="n">24</div><div class="l">Use Case</div></div>
    <div class="sum-item"><div class="n">9</div><div class="l">Quy tắc nghiệp vụ</div></div>
    <div class="sum-item"><div class="n">30+</div><div class="l">Sơ đồ UML/ERD</div></div>
  </div>

  <div class="ov-grid">
    <div class="ov-card"><h4>Backend</h4><p>Java 21 · Spring Boot modular monolith · MySQL 8.4 · Flyway · Maven</p></div>
    <div class="ov-card"><h4>Frontend</h4><p>React 18 · TypeScript · Vite · SWR · WebRTC (signaling nội bộ)</p></div>
    <div class="ov-card"><h4>Xác thực</h4><p>Keycloak (OIDC/JWT) · Role-based + resource-based authorization</p></div>
    <div class="ov-card"><h4>Hạ tầng</h4><p>Docker Compose · Testcontainers · GitHub Actions CI · Mailpit (dev)</p></div>
    <div class="ov-card"><h4>Kiểm thử</h4><p>JUnit 5 · JaCoCo · Vitest · Playwright · MockMvc · Testcontainers</p></div>
    <div class="ov-card"><h4>Phiên bản nộp</h4><p>Branch: docs/design-source-report · HEAD 84185060 · 17/11/2026</p></div>
  </div>

  <div class="stack-grid">
    <div class="stk">Java 21 <span>backend compile</span></div>
    <div class="stk">Spring Boot 3.x <span>framework</span></div>
    <div class="stk">MySQL 8.4 <span>InnoDB</span></div>
    <div class="stk">Keycloak 24 <span>OIDC IdP</span></div>
    <div class="stk">React 18 <span>frontend</span></div>
    <div class="stk">TypeScript 5 <span>type-safe</span></div>
    <div class="stk">Vite 5 <span>bundler</span></div>
    <div class="stk">WebRTC <span>telehealth media</span></div>
    <div class="stk">OpenAPI 3.1 <span>contract v1.0.0</span></div>
    <div class="stk">Docker Compose <span>local env</span></div>
  </div>

  <div class="ov-grid">
    <div class="ov-card"><h4>Vai trò</h4><p>PATIENT · DOCTOR · RECEPTIONIST · ADMIN · AUDITOR</p></div>
    <div class="ov-card"><h4>Hình thức khám</h4><p>DIRECT (trực tiếp tại phòng khám) · TELEHEALTH (video call)</p></div>
    <div class="ov-card"><h4>Giới hạn đã biết</h4><p>BE-01..04 (bảo mật/audit/contract còn tồn đọng) · E2E chưa nghiệm thu · Media xuyên NAT chưa kiểm thử</p></div>
  </div>
</section>

<section class="section" id="modules">
  <div class="sh"><span class="sh-ic">🧩</span><div class="sh-txt"><h2>Phân hệ M01–M09</h2><p>9 bounded contexts, mỗi phân hệ tương ứng nhóm FR và UC</p></div></div>
  <div class="mod-grid">
    <div class="mod m1"><h4>M01 · Xác thực &amp; Phân quyền</h4><p>OIDC/JWT, ánh xạ vai trò, kiểm tra quyền theo role + resource</p></div>
    <div class="mod m2"><h4>M02 · Bác sĩ &amp; Chuyên khoa</h4><p>Danh mục bác sĩ, chuyên khoa, trạng thái tiếp nhận lịch</p></div>
    <div class="mod m3"><h4>M03 · Lịch làm việc</h4><p>Lịch làm/nghỉ, sinh và tra cứu slot khả dụng</p></div>
    <div class="mod m4"><h4>M04 · Lịch hẹn</h4><p>Đặt/đổi/hủy, trạng thái, chống trùng và idempotency</p></div>
    <div class="mod m5"><h4>M05 · Hồ sơ lâm sàng</h4><p>Encounter, hồ sơ có phiên bản, đơn thuốc ISSUED bất biến</p></div>
    <div class="mod m6"><h4>M06 · Thông báo</h4><p>Xác nhận/nhắc lịch, outbox retry, theo dõi trạng thái gửi</p></div>
    <div class="mod m7"><h4>M07 · Kiểm toán</h4><p>Ghi sự kiện đọc/ghi, append-only, fail-closed, tra cứu</p></div>
    <div class="mod m8"><h4>M08 · Tiếp đón &amp; Hàng đợi</h4><p>Check-in, FIFO, gọi lượt, bỏ lượt, hoàn tất lượt</p></div>
    <div class="mod m9"><h4>M09 · Khám từ xa</h4><p>Token ngắn hạn, signaling WebRTC, nối lại, kết thúc phiên</p></div>
  </div>
</section>
`;
