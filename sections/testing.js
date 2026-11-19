/* sections/testing.js — Bảng PCL N/B/A (29 test case) + Ma trận truy vết */

window.SECTION_TESTING = `
<section class="section" id="pcl">
  <div class="sh"><span class="sh-ic">🧪</span><div class="sh-txt"><h2>Bảng PCL — Kiểm thử theo chuẩn N/B/A</h2><p>29 test case · N=Normal · B=Boundary · A=Abnormal · suite backend 65 test, BUILD SUCCESS 19/11/2026</p></div></div>

  <div class="sum-bar" style="margin-bottom:16px">
    <div class="sum-item"><div class="n" style="color:var(--ok)">29</div><div class="l">Đạt ✓</div></div>
    <div class="sum-item"><div class="n" style="color:var(--err)">0</div><div class="l">Lỗi ✗</div></div>
    <div class="sum-item"><div class="n">65</div><div class="l">Backend tests</div></div>
    <div class="sum-item"><div class="n">41</div><div class="l">Frontend Vitest</div></div>
    <div class="sum-item"><div class="n">2</div><div class="l">Playwright</div></div>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>ID</th><th>Phương thức nghiệp vụ</th><th>PL</th><th>Điều kiện đầu vào</th><th>Kết quả kỳ vọng</th><th>Nguồn</th><th>KQ</th></tr></thead>
      <tbody>
        <tr><td>TC-N01</td><td>FR-08 Đặt lịch — bình thường</td><td><span class="pl-n">N</span></td><td>Bệnh nhân hợp lệ; slot trống; Idempotency-Key lần đầu</td><td>CONFIRMED · audit CREATED · notification enqueued</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B01</td><td>FR-08 Đặt lịch — slot cuối tranh chấp</td><td><span class="pl-b">B</span></td><td>Slot cuối + 2 request song song từ 2 bệnh nhân</td><td>1 CONFIRMED · 1 SLOT_CONFLICT (409)</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A01</td><td>FR-08 Đặt lịch — slot đã đặt</td><td><span class="pl-a">A</span></td><td>Slot đã có CONFIRMED của người khác</td><td>409 SLOT_CONFLICT</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A02</td><td>FR-08 Đặt lịch — phát lại idempotent</td><td><span class="pl-a">A</span></td><td>Idempotency-Key đã dùng, payload giống hệt</td><td>200 từ cache; không tạo thêm lịch</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N02</td><td>FR-09 Đổi lịch — bình thường</td><td><span class="pl-n">N</span></td><td>Chủ sở hữu; slot mới trống; còn ≥2h</td><td>Slot cập nhật · version+1 · audit RESCHEDULE</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B02</td><td>FR-09 Đổi lịch — cửa sổ 2h biên</td><td><span class="pl-b">B</span></td><td>Còn đúng 2 giờ trước giờ hẹn</td><td>Cho phép đổi (đúng biên)</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A03</td><td>FR-09 Đổi lịch — quá hạn cửa sổ</td><td><span class="pl-a">A</span></td><td>Còn &lt;2 giờ trước giờ hẹn</td><td>409 CHANGE_WINDOW_EXPIRED · lịch cũ giữ nguyên</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A04</td><td>FR-09 Đổi lịch — không phải chủ sở hữu</td><td><span class="pl-a">A</span></td><td>Bệnh nhân B đổi lịch của bệnh nhân A</td><td>403 FORBIDDEN</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A05</td><td>FR-09 Đổi lịch — version conflict</td><td><span class="pl-a">A</span></td><td>Version cũ (concurrent update)</td><td>409 VERSION_CONFLICT</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N03</td><td>FR-10 Hủy lịch — bình thường</td><td><span class="pl-n">N</span></td><td>Chủ sở hữu; lịch CONFIRMED</td><td>CANCELLED · audit · notification enqueued</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B03</td><td>FR-10 Hủy lịch — trạng thái chuyển tiếp</td><td><span class="pl-b">B</span></td><td>Lịch PENDING (chờ xác nhận)</td><td>Hủy hoặc từ chối theo chính sách trạng thái</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A06</td><td>FR-10 Hủy lịch — đã hủy rồi</td><td><span class="pl-a">A</span></td><td>Lịch đã CANCELLED</td><td>409 INVALID_STATE</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N04</td><td>FR-19 Check-in — trong cửa sổ</td><td><span class="pl-n">N</span></td><td>Lịch CONFIRMED; trong cửa sổ [T−15, T+15) phút</td><td>1 phiếu WAITING · audit CHECKIN</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B04</td><td>FR-19 Check-in — đúng mốc mở</td><td><span class="pl-b">B</span></td><td>Check-in tại biên mở T−15 phút</td><td>Phiếu tạo ở biên mở; ngoài biên bị từ chối</td><td>checkInHasExactTimeBoundariesAndRoleChecks</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A07</td><td>FR-19 Check-in — ngoài cửa sổ</td><td><span class="pl-a">A</span></td><td>Check-in trước/sau cửa sổ cho phép</td><td>409 · phiếu không tạo</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N05</td><td>FR-13 Hồ sơ — tạo DRAFT</td><td><span class="pl-n">N</span></td><td>Bác sĩ đang điều trị tạo bệnh án</td><td>DRAFT lưu; có thể sửa</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B05</td><td>FR-13 Hồ sơ — chốt FINAL</td><td><span class="pl-b">B</span></td><td>Chuyển DRAFT → FINAL</td><td>FINAL bất biến; amendment tạo version mới</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A08</td><td>FR-13 Hồ sơ — sửa FINAL</td><td><span class="pl-a">A</span></td><td>Ghi đè trực tiếp bệnh án FINAL</td><td>409 RECORD_IMMUTABLE</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N06</td><td>FR-01 JWT — token hợp lệ</td><td><span class="pl-n">N</span></td><td>JWT hợp lệ, chưa hết hạn, role khớp</td><td>200 · dữ liệu đúng quyền</td><td>JwtValidationTest (5)</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B06</td><td>FR-01 JWT — hết hạn</td><td><span class="pl-b">B</span></td><td>Token exp trong quá khứ</td><td>401 UNAUTHORIZED</td><td>JwtValidationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A09</td><td>FR-01 JWT — chữ ký giả mạo</td><td><span class="pl-a">A</span></td><td>Signature bị sửa</td><td>401 · không lộ dữ liệu</td><td>JwtValidationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A10</td><td>FR-01 JWT — không có header</td><td><span class="pl-a">A</span></td><td>Không có Authorization header</td><td>401 UNAUTHORIZED</td><td>JwtValidationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N07</td><td>NFR-02 Tranh chấp — đặt đơn</td><td><span class="pl-n">N</span></td><td>1 request; slot trống</td><td>1 CONFIRMED</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B07</td><td>NFR-02 Tranh chấp — 2 đồng thời</td><td><span class="pl-b">B</span></td><td>2 request đồng thời cùng slot</td><td>1 CONFIRMED · 1 SLOT_CONFLICT</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A11</td><td>NFR-02 Tranh chấp — 100 đồng thời</td><td><span class="pl-a">A</span></td><td>100 request cùng slot, cùng thời điểm</td><td>1 CONFIRMED · 99 SLOT_CONFLICT</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N08</td><td>NFR-03 Phân quyền — đúng vai trò</td><td><span class="pl-n">N</span></td><td>Bác sĩ đọc bệnh án bệnh nhân đang điều trị</td><td>200 · dữ liệu hợp lệ</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B08</td><td>NFR-03 Phân quyền — lễ tân đọc availability</td><td><span class="pl-b">B</span></td><td>Lễ tân gọi GET availability (cần cho nghiệp vụ)</td><td>200 · không được phép thêm/xóa</td><td>receptionCanReadDoctorSchedulesButCannotChangeThem</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A12</td><td>NFR-03 Phân quyền — bệnh nhân đọc chéo</td><td><span class="pl-a">A</span></td><td>Bệnh nhân A đọc hồ sơ bệnh nhân B</td><td>403 FORBIDDEN · không lộ dữ liệu</td><td>SchedulingIntegrationTest</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A13</td><td>NFR-03 AUDITOR scope vượt quyền</td><td><span class="pl-a">A</span></td><td>AUDITOR gọi GET doctors/specialties/slots</td><td>403 FORBIDDEN</td><td>catalogReadsRequireAnOperationalRole</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A14</td><td>NFR-05 Audit fail-closed — DENIED</td><td><span class="pl-a">A</span></td><td>Yêu cầu bị từ chối → phải sinh audit DENIED</td><td>Audit ghi nguyên tử trước phản hồi; không lộ dữ liệu</td><td>deniedTelehealthJoinPersistsOnlyAudit</td><td class="res-ok">✓</td></tr>
      </tbody>
    </table>
  </div>
  <p style="font-size:12px;color:var(--txt3);margin-top:12px"><strong style="color:var(--txt2)">Tóm tắt:</strong> 29 test case — <strong style="color:var(--ok)">29 đạt</strong>, 0 lỗi. Toàn bộ backend 65 test đạt trên MySQL 8.4 thật qua Testcontainers.</p>
</section>

<section class="section" id="trace">
  <div class="sh"><span class="sh-ic">🔗</span><div class="sh-txt"><h2>Ma trận truy vết (trích lục)</h2><p>FR → UC → TC → Trạng thái · Phụ lục A đầy đủ trong Report/Phu-luc-A-Truy-vet.md</p></div></div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>FR</th><th>UC</th><th>Test Case PCL</th><th>NFR liên quan</th><th>Tình trạng</th></tr></thead>
      <tbody>
        <tr><td><strong>FR-01</strong> Xác thực OIDC</td><td>UC-01</td><td>TC-N06, TC-B06, TC-A09, TC-A10</td><td>NFR-04 Bảo mật</td><td><span class="badge bstat-ok">✓ Có bằng chứng</span></td></tr>
        <tr><td><strong>FR-02</strong> Phân quyền</td><td>UC-02</td><td>TC-N08, TC-A12, TC-A13</td><td>NFR-03</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-07</strong> Tra cứu slot</td><td>UC-07</td><td>TC-B08</td><td>NFR-03</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-08</strong> Đặt lịch</td><td>UC-08</td><td>TC-N01, TC-B01, TC-A01, TC-A02</td><td>NFR-02</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-09</strong> Đổi lịch</td><td>UC-09</td><td>TC-N02, TC-B02, TC-A03..A05</td><td>NFR-02</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-10</strong> Hủy lịch</td><td>UC-10</td><td>TC-N03, TC-B03, TC-A06</td><td>—</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-13</strong> Hồ sơ khám</td><td>UC-13</td><td>TC-N05, TC-B05, TC-A08</td><td>NFR-05</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-17</strong> Ghi audit</td><td>UC-17</td><td>TC-A14</td><td>NFR-05</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-19</strong> Check-in</td><td>UC-19</td><td>TC-N04, TC-B04, TC-A07</td><td>—</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-20</strong> Hàng đợi</td><td>UC-20</td><td>TC-A11, TC-N07, TC-B07</td><td>NFR-02</td><td><span class="badge bstat-ok">✓ Đầy đủ</span></td></tr>
        <tr><td><strong>FR-23</strong> Token từ xa</td><td>UC-23</td><td>—</td><td>NFR-04</td><td><span class="badge bstat-warn">Giới hạn media xuyên NAT</span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="alert alert-info" style="margin-top:16px">
    ℹ Ma trận truy vết đầy đủ 24 FR × UC × TC × BR tại <code>docs/requirements/traceability-matrix.md</code> và Phụ lục A.
  </div>
</section>
`;
