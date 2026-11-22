/* sections/testing.js — Bảng PCL N/B/A, Agent Catalog, Benchmark NFR-01 & Ma trận truy vết (main@327a553, 22/11/2026) */

window.SECTION_TESTING = `
<section class="section" id="pcl">
  <div class="alert alert-info" style="margin-bottom:16px">
    <span>📏</span>
    <div><strong>Chuẩn &amp; Kỹ thuật kiểm thử áp dụng:</strong> Phân cấp &amp; truy vết theo <strong>ISO/IEC/IEEE 29119</strong>; phân loại ca theo chuẩn <strong>PCL (<code>N / B / A</code>)</strong>; cấu trúc unit test <strong>Arrange–Act–Assert (AAA)</strong>; tiêu chí NFR tham chiếu <strong>ISO/IEC 25010:2023</strong>, <strong>OWASP ASVS 5.0 / WSTG</strong> và quét tự động <strong>WCAG 2.2 AA</strong> (<code>axe-core</code>).</div>
  </div>
  <div class="sh"><span class="sh-ic">🧪</span><div class="sh-txt"><h2>Bảng PCL — Kiểm thử theo chuẩn N/B/A</h2><p>30 ca PCL (<code>N</code>=Normal · <code>B</code>=Boundary · <code>A</code>=Abnormal) · CI <code>#43</code> (<code>7c13276</code>) đạt 86/86 test Backend + cổng <code>jacoco:check</code> &ge;60% + 79/79 Vitest</p></div></div>

  <div class="sum-bar" style="margin-bottom:16px">
    <div class="sum-item"><div class="n" style="color:var(--ok)">30 / 30</div><div class="l">Ca PCL Đạt ✓</div></div>
    <div class="sum-item"><div class="n">86</div><div class="l">Backend tests (MySQL 8.4)</div></div>
    <div class="sum-item"><div class="n">79 / 22</div><div class="l">Frontend Vitest / File</div></div>
    <div class="sum-item"><div class="n">17</div><div class="l">Playwright (scan/rtc/auth)</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">24 / 24</div><div class="l">Sổ test Agent PASS</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">16 / 16</div><div class="l">NFR Đạt</div></div>
    <div class="sum-item"><div class="n" style="color:var(--ok)">9,37 ms</div><div class="l">NFR-01 Overall p95</div></div>
  </div>

  <div class="tbl-wrap">
    <table>
      <thead><tr><th>ID</th><th>Phương thức nghiệp vụ</th><th>PL</th><th>Điều kiện đầu vào</th><th>Kết quả kỳ vọng</th><th>Nguồn kiểm chứng</th><th>KQ</th></tr></thead>
      <tbody>
        <tr><td>TC-N01</td><td>FR-08 Đặt lịch — bình thường</td><td><span class="pl-n">N</span></td><td>Bệnh nhân hợp lệ; slot trống; <code>Idempotency-Key</code> lần đầu</td><td><code>CONFIRMED</code> · audit CREATED · notification enqueued</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B01</td><td>FR-08 Đặt lịch — slot cuối tranh chấp</td><td><span class="pl-b">B</span></td><td>Slot cuối + nhiều yêu cầu song song cùng thời điểm</td><td>Đúng 1 <code>CONFIRMED</code> · các yêu cầu còn lại nhận 409</td><td><code>SchedulingIntegrationTest</code> + k6 (1/99)</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A01</td><td>FR-08 Đặt lịch — slot đã đặt</td><td><span class="pl-a">A</span></td><td>Slot đã có lịch hiệu lực hoặc trùng giờ bác sĩ/bệnh nhân</td><td>409 xung đột; không tạo lịch thứ hai</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A02</td><td>FR-08 Đặt lịch — phát lại idempotent</td><td><span class="pl-a">A</span></td><td><code>Idempotency-Key</code> đã dùng, payload giống hệt; đổi payload → 409</td><td>200 trả kết quả cũ từ cache (TTL 24h); không lặp tác dụng phụ</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N02</td><td>FR-09 Đổi lịch — bình thường</td><td><span class="pl-n">N</span></td><td>Chủ sở hữu; slot mới trống; còn &ge;2h; đúng <code>version</code></td><td>Cập nhật slot · <code>version+1</code> · audit RESCHEDULED</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B02</td><td>FR-09 Đổi lịch — cửa sổ 2h biên</td><td><span class="pl-b">B</span></td><td>Còn đúng 2 giờ (<code>7200 s</code>) trước giờ hẹn</td><td>Cho phép đổi đúng biên</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A03</td><td>FR-09 Đổi lịch — quá hạn cửa sổ</td><td><span class="pl-a">A</span></td><td>Sau mốc T−2 giờ dù chỉ 1 giây</td><td>409 · lịch cũ giữ nguyên</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A04</td><td>FR-09 Đổi lịch — không phải chủ sở hữu</td><td><span class="pl-a">A</span></td><td>Bệnh nhân B gửi đổi lịch của bệnh nhân A</td><td>404/403 từ chối truy cập tài nguyên không sở hữu</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A05</td><td>FR-09 Đổi lịch — version conflict</td><td><span class="pl-a">A</span></td><td>Gửi <code>version</code> cũ hơn DB hiện tại</td><td>409 Stale appointment version</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N03</td><td>FR-10 Hủy lịch — bình thường</td><td><span class="pl-n">N</span></td><td>Chủ sở hữu; <code>CONFIRMED</code>; lý do hợp lệ; còn &ge;2h</td><td><code>CANCELLED</code> · audit CANCELLED · vô hiệu nhắc cũ</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B03</td><td>FR-10 Hủy lịch — kiểm tra phiên bản nhắc</td><td><span class="pl-b">B</span></td><td>Lịch vừa hủy có <code>notification_job</code> nhắc hẹn PENDING</td><td>Worker phát hiện khác version/trạng thái → bỏ job (<code>SKIPPED</code>)</td><td><code>SchedulingIntegrationTest</code> + <code>smoke.py</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A06</td><td>FR-10 Hủy lịch — đã <code>IN_PROGRESS</code> / hủy</td><td><span class="pl-a">A</span></td><td>Lịch không ở trạng thái <code>CONFIRMED</code></td><td>409 · không hủy lại</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N04</td><td>FR-19 Check-in — trong cửa sổ</td><td><span class="pl-n">N</span></td><td>Lịch trực tiếp <code>CONFIRMED</code> trong <code>[T−15p, T+15p)</code></td><td>1 phiếu <code>WAITING</code> · <code>CHECKED_IN</code> · gửi lại dùng cùng phiếu</td><td><code>SchedulingIntegrationTest</code> (<code>RG-10/11</code>)</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B04</td><td>FR-19 Check-in — đúng mốc mở</td><td><span class="pl-b">B</span></td><td>Tại T−15p (đạt), T−15p−1s (từ chối), T+15p (từ chối)</td><td>Chỉ chấp nhận <code>[start−900s, start+900s)</code></td><td><code>checkInHasExactTimeBoundariesAndRoleChecks</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A07</td><td>FR-19 Check-in — ngoài cửa sổ / từ xa</td><td><span class="pl-a">A</span></td><td>Lịch <code>REMOTE</code> hoặc ngoài cửa sổ thời gian</td><td>409 · không phát sinh phiếu chờ</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N05</td><td>FR-13 Hồ sơ — tạo DRAFT</td><td><span class="pl-n">N</span></td><td>Bác sĩ phụ trách lưu nháp trong lần khám</td><td>Lưu <code>DRAFT</code> · tăng <code>version</code> · tải lại sau F5</td><td><code>SchedulingIntegrationTest</code> + <code>clinical-flow.test.tsx</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B05</td><td>FR-13 Hồ sơ — chốt FINAL &amp; bổ sung</td><td><span class="pl-b">B</span></td><td>Chuyển <code>DRAFT &rarr; FINAL</code> rồi tạo amendment</td><td><code>FINAL</code> bất biến · bổ sung tạo bản <code>FINAL</code> mới tham chiếu bản trước</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A08</td><td>FR-13 Hồ sơ — sửa đè FINAL</td><td><span class="pl-a">A</span></td><td>Gửi PUT trực tiếp lên bản đã <code>FINAL</code></td><td>409 từ chối ghi đè</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N06</td><td>FR-01 JWT — token hợp lệ</td><td><span class="pl-n">N</span></td><td>JWT chữ ký RSA đúng, <code>aud=clinic-api</code>, còn hạn</td><td>200 · ánh xạ danh tính và quyền từ DB</td><td><code>JwtValidationTest</code> (5)</td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B06</td><td>FR-01 JWT — hết hạn</td><td><span class="pl-b">B</span></td><td>Token có <code>exp</code> trong quá khứ</td><td>401 Unauthorized</td><td><code>JwtValidationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A09</td><td>FR-01 JWT — chữ ký giả / sai aud</td><td><span class="pl-a">A</span></td><td>Chữ ký sai hoặc audience khác <code>clinic-api</code></td><td>401 · không tiết lộ dữ liệu</td><td><code>JwtValidationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A10</td><td>FR-01 JWT — thiếu Authorization</td><td><span class="pl-a">A</span></td><td>Request vào endpoint bảo vệ không có Bearer token</td><td>401 Unauthorized</td><td><code>JwtValidationTest</code> + <code>post-deploy-smoke</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N07</td><td>NFR-02 Tranh chấp — đặt đơn</td><td><span class="pl-n">N</span></td><td>1 request; slot trống</td><td>1 <code>CONFIRMED</code></td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B07</td><td>NFR-02 Tranh chấp — 2 luồng đồng thời</td><td><span class="pl-b">B</span></td><td>2 giao dịch đồng thời cùng bác sĩ/bệnh nhân (<code>RG-05..12</code>)</td><td>1 thành công · 1 nhận 409 hoặc tái sử dụng đúng bản ghi</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A11</td><td>NFR-02 Tranh chấp — 100 req đồng thời</td><td><span class="pl-a">A</span></td><td>100 VU đặt đồng thời đúng 1 slot duy nhất</td><td>Đúng <strong>1 thành công</strong> · <strong>99 phản hồi 409</strong></td><td><code>k6 appointment-contention.js</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-N08</td><td>NFR-03 Phân quyền — đúng vai trò</td><td><span class="pl-n">N</span></td><td>Bác sĩ đọc bệnh án của bệnh nhân được phân công</td><td>200 · dữ liệu hợp lệ + audit READ</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-B08</td><td>NFR-03 Phân quyền — lễ tân đọc availability</td><td><span class="pl-b">B</span></td><td>Lễ tân gọi GET lịch làm/nghỉ &amp; bị chặn khi ghi (<code>RG-02</code>)</td><td>GET 200 · POST/DELETE 403 (đã sửa BE-02)</td><td><code>receptionCanReadDoctorSchedulesButCannotChangeThem</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A12</td><td>NFR-03 Phân quyền — đọc chéo bệnh nhân</td><td><span class="pl-a">A</span></td><td>Bệnh nhân A truy cập hồ sơ bệnh nhân B</td><td>403/404 · không lộ nội dung hồ sơ</td><td><code>SchedulingIntegrationTest</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A13</td><td>NFR-03 AUDITOR vượt phạm vi danh mục</td><td><span class="pl-a">A</span></td><td><code>AUDITOR</code> thuần gọi GET doctors/specialties/slots (<code>RG-03</code>)</td><td>403 Forbidden (đã sửa BE-03)</td><td><code>catalogReadsRequireAnOperationalRole</code></td><td class="res-ok">✓</td></tr>
        <tr><td>TC-A14</td><td>NFR-05 Audit fail-closed — DENIED</td><td><span class="pl-a">A</span></td><td>Người ngoài gọi join phòng từ xa (<code>RG-01</code>) &amp; lỗi DB audit</td><td>404 + audit <code>DENIED</code> mang <code>X-Request-Id</code>; lỗi audit → rollback (đã sửa BE-01)</td><td><code>deniedTelehealthJoinPersistsOnlyAudit</code></td><td class="res-ok">✓</td></tr>
      </tbody>
    </table>
  </div>
  <p style="font-size:12px;color:var(--txt3);margin-top:12px"><strong style="color:var(--txt2)">Tóm tắt:</strong> 30/30 ca PCL đều đạt (0 lỗi). Toàn bộ 86 test Backend chạy trên MySQL 8.4 Testcontainers và đạt cổng JaCoCo <code>LINE &ge;60%</code>, <code>BRANCH &ge;60%</code> tại CI <code>#43</code>.</p>
</section>

<section class="section" id="nfr-01-bench">
  <div class="sh"><span class="sh-ic">⚡</span><div class="sh-txt"><h2>Đối chứng Benchmark NFR-01 (50 VU &times; 15 phút &times; 10.000 lịch)</h2><p>Chứng minh cải thiện hiệu năng Trước &amp; Sau tối ưu chỉ mục (<code>V10</code>, <code>V11</code>), truy vấn <code>ScheduleService</code>/<code>AppointmentService</code>, <code>Db</code>/<code>Access</code>, HikariCP 30 &amp; gzip</p></div></div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Chỉ số đo (50 VU, 15m, đọc + ghi, 10.000 lịch)</th><th>Trước tối ưu (<code>55286a9</code>)</th><th>Sau tối ưu (<code>12740a9</code> · Run <code>44931759747</code>)</th><th>Mức cải thiện</th><th>Ngưỡng NFR-01</th></tr></thead>
      <tbody>
        <tr><td><strong>Tổng thể HTTP <code>p95</code></strong></td><td class="metric-bad">4.320 ms (4,32 s)</td><td class="metric-good">9,37 ms (avg 6,36 ms · max 224,1 ms)</td><td>Nhanh hơn <strong>461&times;</strong></td><td>&le; 2.000 ms</td></tr>
        <tr><td><strong><code>GET /api/slots</code> <code>p95</code></strong></td><td class="metric-bad">4.520 ms (4,52 s)</td><td class="metric-good">7,81 ms (avg 5,72 ms · med 5,51 ms)</td><td>Nhanh hơn <strong>578&times;</strong></td><td>&le; 2.000 ms</td></tr>
        <tr><td><strong><code>POST /api/appointments</code> <code>p95</code></strong></td><td class="metric-bad">3.720 ms (3,72 s)</td><td class="metric-good">12,04 ms (avg 8,32 ms · med 7,76 ms)</td><td>Nhanh hơn <strong>309&times;</strong></td><td>&le; 2.000 ms</td></tr>
        <tr><td><strong>Thông lượng HTTP</strong></td><td>16.912 req (17,06 req/s)</td><td class="metric-good">70.270 req (70,96 req/s)</td><td>Gấp <strong>4,15&times;</strong></td><td>—</td></tr>
        <tr><td><strong>Tỷ lệ Checks đạt &amp; Lỗi HTTP</strong></td><td>100% (không đạt ngưỡng thời gian)</td><td class="metric-good">105.330 / 105.330 (100,00%) · 0,00% lỗi</td><td>Đạt toàn diện</td><td>&ge; 99% · &lt; 1%</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section" id="agent-suite">
  <div class="sh"><span class="sh-ic">📑</span><div class="sh-txt"><h2>Bộ kiểm thử mở rộng &amp; Xác minh thực địa (<code>AGENT-TC-001..023</code>, <code>TC-N05</code>)</h2><p>24/24 ca trong sổ kiểm thử đều đạt trạng thái <code>PASS</code> sau CI <code>#43</code> (<code>7c13276</code>) và NFR-01 Run <code>44931759747</code> (<code>12740a9</code>)</p></div></div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Nhóm ca kiểm thử</th><th>Mã ca</th><th>Công cụ / Môi trường</th><th>Nội dung &amp; Kết quả xác minh gần nhất</th><th>Trạng thái</th></tr></thead>
      <tbody>
        <tr><td><strong>Chịu lỗi mất mạng UI</strong></td><td><code>AGENT-TC-001</code></td><td>Vitest + RTL (<code>booking-offline.test.tsx</code>)</td><td>Giả lập mất mạng <code>ApiError(0)</code> ở bước đặt lịch: hiện lỗi <code>&lt; 10 s</code>, giữ lựa chọn và tái sử dụng cùng <code>Idempotency-Key</code> khi retry.</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
        <tr><td><strong>OIDC / SSO / Redirect / Grants</strong></td><td><code>AGENT-TC-002..008</code></td><td>Playwright + <code>scripts/verify-live-demo.py</code></td><td>Đăng nhập DOCTOR/PATIENT, từ chối mật khẩu sai, chặn truy cập chéo <code>/doctor</code>, logout SSO, chặn <code>redirect_uri</code> lạ, chặn <code>password</code> grant (<code>unauthorized_client</code>).</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
        <tr><td><strong>Security Headers &amp; IP Rate-Limit</strong></td><td><code>AGENT-TC-009</code>, <code>012</code></td><td>Python unittest + HTTPS Azure VM</td><td>Caddy + Nginx trả đủ HSTS, CSP (<code>frame-ancestors 'none'</code>), X-Frame-Options DENY, nosniff; Nginx áp <code>limit_req_zone 10r/m</code> trả 429 cho <code>/api/me/contact/otp</code>.</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
        <tr><td><strong>OTP 6 số, HMAC &amp; Brute-force</strong></td><td><code>AGENT-TC-013..016</code></td><td>JUnit + Mockito + Testcontainers MySQL + Vitest</td><td><code>ContactOtpServiceTest</code> (5/5), <code>test_azure_google_oauth.py</code> (brute-force 5 lần), <code>PatientAccountIntegrationTest</code> (MySQL 8.4 + <code>V9</code> trên CI), <code>account-page.test.tsx</code> (2/2).</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
        <tr><td><strong>Guard &amp; Post-Deploy Smoke</strong></td><td><code>AGENT-TC-017</code>, <code>018</code></td><td>Vitest + Python + GitHub Actions</td><td><code>guard-redirect.test.tsx</code> (2/2) chuyển về trang chủ vai trò mới khi <code>fromSignin=true</code>; <code>verify-live-demo.py</code> kiểm tra 6/6 chốt HTTPS + OIDC + WebRTC ICE/STUN.</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
        <tr><td><strong>TURN/WebRTC, Business Rules &amp; Backup</strong></td><td><code>AGENT-TC-019..021</code></td><td>Python + JUnit + MySQL 8.4 <code>mysqldump</code></td><td>Cấu hình <code>coturn</code> quota <code>4/32</code> &amp; STUN 3478 UDP/TCP phản hồi <code>0x0101</code>; <code>BusinessRulesUnitTest</code> (5/5); <code>BackupRestoreIntegrationTest</code> restore &amp; kiểm FK + AES-GCM (CI <code>#43</code>).</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
        <tr><td><strong>Tải chuẩn NFR-01 &amp; Usability</strong></td><td><code>AGENT-TC-022..023</code>, <code>TC-N05</code></td><td>GitHub Actions + MySQL 8.4 + k6 · Điện thoại thật</td><td><code>Nfr01LoadHarnessTests</code> (4/4); k6 50 VU &times; 15m đạt <code>p95 = 9,37 ms</code>; <code>TC-N05</code> nhóm thử thực tế trên điện thoại (không lưu biên bản bấm giờ riêng).</td><td><span class="badge bstat-ok">✓ PASS</span></td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section" id="trace">
  <div class="sh"><span class="sh-ic">🔗</span><div class="sh-txt"><h2>Ma trận truy vết tổng hợp (27 FR &rarr; UC &rarr; NFR &rarr; Bằng chứng)</h2><p>Đối chiếu <code>docs/requirements/traceability-matrix.md</code> tại <code>main@327a553</code> · Xem chi tiết tra cứu tại trang <a href="requirements.html#review-matrix">Yêu cầu</a></p></div></div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>FR</th><th>UC</th><th>Thao tác API chính</th><th>NFR liên quan</th><th>Tình trạng &amp; Bằng chứng</th></tr></thead>
      <tbody>
        <tr><td><strong>FR-01</strong> Xác thực, OAuth2, OTP, Khóa tạm</td><td>UC-01</td><td><code>/me</code>, <code>/me/profile</code>, <code>/me/contact/otp</code>, <code>/me/contact</code></td><td>NFR-04, NFR-15</td><td><span class="badge bstat-ok">✓ Đạt (CI + Unit/MySQL/UI)</span></td></tr>
        <tr><td><strong>FR-02</strong> Phân quyền RBAC &amp; Guard</td><td>UC-02</td><td><code>/me</code>, <code>/users/{id}/roles</code>, <code>/appointments</code>, <code>Guard.tsx</code></td><td>NFR-03</td><td><span class="badge bstat-ok">✓ Đạt (Integration + Vitest)</span></td></tr>
        <tr><td><strong>FR-03..04</strong> Bác sĩ &amp; Chuyên khoa</td><td>UC-03..04</td><td><code>/specialties</code>, <code>/doctors</code>, <code>PUT /doctors/{id}</code></td><td>NFR-02, NFR-11</td><td><span class="badge bstat-ok">✓ Đạt (RG-08/09 + BusinessRulesUnitTest)</span></td></tr>
        <tr><td><strong>FR-05..07</strong> Giờ khám, Ngày lễ, Slots</td><td>UC-05..07</td><td><code>/clinic/hours</code>, <code>/clinic/holidays</code>, <code>/availability</code>, <code>/time-off</code>, <code>/slots</code></td><td>NFR-01, NFR-03</td><td><span class="badge bstat-ok">✓ Đạt (RG-02/06/07 + NFR-01 p95 7,81 ms)</span></td></tr>
        <tr><td><strong>FR-08..11</strong> Đặt, Đổi, Hủy, Tiến trình</td><td>UC-08..11</td><td><code>/appointments</code>, <code>/reschedule</code>, <code>/cancel</code>, <code>/progress</code></td><td>NFR-01, NFR-02, NFR-08, NFR-09</td><td><span class="badge bstat-ok">✓ Đạt (k6 1/99, NFR-01, BookingOffline)</span></td></tr>
        <tr><td><strong>FR-12..14</strong> Lâm sàng, Hồ sơ &amp; Đơn thuốc</td><td>UC-12..14</td><td><code>/encounters/{id}/record</code>, <code>/amendments</code>, <code>/prescriptions</code>, <code>/issue</code></td><td>NFR-03, NFR-05, NFR-12</td><td><span class="badge bstat-ok">✓ Đạt (MySQL + <code>clinical-flow.test.tsx</code>)</span></td></tr>
        <tr><td><strong>FR-15..16</strong> Nhắc lịch &amp; Retry Outbox</td><td>UC-15..16</td><td><code>/notification-jobs</code>, <code>NotificationWorker</code></td><td>NFR-07, NFR-12</td><td><span class="badge bstat-ok">✓ Đạt (MySQL retry 1/5/15p + Mailpit)</span></td></tr>
        <tr><td><strong>FR-17..18</strong> Ghi Audit fail-closed &amp; Tra cứu</td><td>UC-17..18</td><td><code>/audit-events</code>, thành phần <code>Audit</code></td><td>NFR-05, NFR-12</td><td><span class="badge bstat-ok">✓ Đạt (RG-01 DENIED + Fault injection)</span></td></tr>
        <tr><td><strong>FR-19..21</strong> Check-in, FIFO &amp; Bỏ lượt</td><td>UC-19..21</td><td><code>/appointments/{id}/check-in</code>, <code>/queue</code>, <code>/queue/next</code>, <code>/skip</code></td><td>NFR-02, NFR-03</td><td><span class="badge bstat-ok">✓ Đạt (RG-04, RG-10/11/12 — 204 rỗng)</span></td></tr>
        <tr><td><strong>FR-22..24</strong> Phòng chờ, Video WebRTC/TURN</td><td>UC-22..24</td><td><code>/telehealth-session</code>, <code>/join</code>, <code>/start</code>, <code>/signals</code>, <code>/end</code>, <code>/webrtc/ice</code></td><td>NFR-09, NFR-13</td><td><span class="badge bstat-ok">✓ Đạt (<code>test:rtc</code>, <code>coturn</code> 3478, thử ĐT)</span></td></tr>
        <tr><td><strong>FR-25</strong> Báo chậm giờ khám</td><td>UC-25</td><td><code>POST /appointments/{id}/delay-notice</code></td><td>NFR-07</td><td><span class="badge bstat-ok">✓ Đạt (MySQL + <code>BusinessRulesUnitTest</code>)</span></td></tr>
        <tr><td><strong>FR-26</strong> Ghi nhận vắng hẹn <code>NO_SHOW</code></td><td>UC-26</td><td><code>POST /appointments/{id}/progress</code> (<code>NO_SHOW</code>)</td><td>NFR-05, NFR-12</td><td><span class="badge bstat-ok">✓ Đạt (MySQL + Mail rebook tùy chọn)</span></td></tr>
        <tr><td><strong>FR-27</strong> Tra cứu UUID/email/SĐT &amp; Khóa/Mở</td><td>UC-27</td><td><code>/patient-accounts/lookup</code>, <code>/patient-accounts/{id}/access</code></td><td>NFR-03, NFR-04, NFR-05</td><td><span class="badge bstat-ok">✓ Đạt (<code>PatientAccountIntegrationTest</code> CI <code>#43</code>)</span></td></tr>
      </tbody>
    </table>
  </div>
</section>
`;
