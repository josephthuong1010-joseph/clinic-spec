/* sections/diagrams.js — 38 sơ đồ OMG UML 2.5, Kruchten 4+1 & ERD (đồng bộ 100% SE-project-main@327a553, 22/11/2026) */
/* Toàn bộ ảnh PNG phản chiếu trực tiếp từ SE-project-main/docs/design/ ở 150 DPI */

window.SECTION_DIAGRAMS = `
<section class="section" id="uc-diag">
  <div class="alert alert-info" style="margin-bottom:18px">
    <span>📐</span>
    <div><strong>Đồng bộ thiết kế 100% (<code>main@327a553</code>):</strong> Đầy đủ <strong>38 sơ đồ</strong> theo chuẩn <strong>OMG UML 2.5</strong>, mô hình kiến trúc <strong>Kruchten 4+1 Views</strong> và <strong>IE / Crow's Foot ERD</strong>, bao phủ toàn bộ <strong>9 phân hệ M01–M09</strong>, <strong>27 Use Case</strong>, <strong>24 bảng MySQL 8.4 (<code>V1..V11</code>)</strong> và hạ tầng Azure VM. Các sơ đồ nhiều đường nối (Use Case, Class, ERD, Kiến trúc/Triển khai) đã được <strong>phân màu theo Tác nhân / Miền / Tuyến giao thức kèm bảng chú giải Legend</strong> chuẩn OMG UML 2.5; nhấn nút <code>🔗 Copy link</code> trên từng sơ đồ để mở trực tiếp.</div>
  </div>

  <div class="sh"><span class="sh-ic">🗂️</span><div class="sh-txt"><h2>Sơ đồ Use Case (5 sơ đồ)</h2><p>OMG UML 2.5 · Tổng quan 27 UC và 4 bản tách nhóm theo phân hệ <code>M01–M09</code> · Nhấn vào ảnh để phóng to</p></div></div>

  <p style="font-size:12px;color:var(--txt3);margin-bottom:12px">Sơ đồ tổng quan — đầy đủ 27 Use Case (kèm <code>UC-25..27</code>, Keycloak/Google, SMTP &amp; WebRTC/coturn)</p>
  <div style="margin-bottom:24px">
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-diagram.png')" style="max-width:860px;cursor:zoom-in">
      <img src="assets/design/use-case/use-case-diagram.png" alt="Use Case Tổng quan 27 UC" style="width:100%;height:520px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Tổng quan Use Case — đầy đủ 27 UC (<code>UC-01..UC-27</code>, nhấn để phóng to)</div>
    </div>
  </div>

  <p style="font-size:12px;color:var(--txt3);margin-bottom:12px">4 sơ đồ chi tiết tách nhóm theo phân hệ</p>
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px">
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-1.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-1.png" alt="UC Nhóm 1" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Danh tính, Bảo vệ TK, Danh mục &amp; Lịch phòng khám — <code>UC-01..06, 27</code> (<code>M01–M03, M07</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-2.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-2.png" alt="UC Nhóm 2" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Lịch hẹn, Vắng hẹn &amp; Hàng đợi — <code>UC-07..11, 19..21, 25..26</code> (<code>M03–M04–M06–M08</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-3.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-3.png" alt="UC Nhóm 3" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Chăm sóc lâm sàng &amp; WebRTC P2P — <code>UC-12..14, 22..24</code> (<code>M05–M09</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-4.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-4.png" alt="UC Nhóm 4" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Thông báo Outbox &amp; Kiểm toán — <code>UC-15..18</code> (<code>M06–M07</code>)</div>
    </div>
  </div>
</section>

<section class="section" id="seq-diag">
  <div class="sh"><span class="sh-ic">🔄</span><div class="sh-txt"><h2>Sơ đồ Sequence (16 sơ đồ)</h2><p>Luồng thông điệp theo thời gian thực · bao phủ đầy đủ M01–M09, gồm cơ chế khóa M02, tối ưu slot M03 NFR-01, Audit Fail-Closed M07, OTP &amp; <code>NO_SHOW</code></p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/auth-otp-contact.png')">
      <img src="assets/design/sequence-diagrams/auth-otp-contact.png" alt="UC-01 OIDC PKCE, Google &amp; OTP đổi email" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-01 Xác thực PKCE/Google &amp; OTP đổi email</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/patient-account-admin.png')">
      <img src="assets/design/sequence-diagrams/patient-account-admin.png" alt="UC-27 Tra cứu blind index HMAC và Khóa/Mở tài khoản" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-27 Tra cứu HMAC &amp; Khóa/Mở tài khoản BN</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/staff-and-catalog.png')">
      <img src="assets/design/sequence-diagrams/staff-and-catalog.png" alt="M02 Cấp nhân sự Keycloak+MySQL và Ngừng nhận lịch bác sĩ" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">M02 Cấp nhân sự &amp; Ngừng nhận lịch an toàn (<code>RG-08/09</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/schedule-and-slots.png')">
      <img src="assets/design/sequence-diagrams/schedule-and-slots.png" alt="M03 Giờ mở cửa, Ngày lễ, Lịch nghỉ và Tìm slot tối ưu NFR-01" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">M03 Giờ phòng khám, Ngày lễ &amp; Tìm slot NFR-01 (<code>7,81 ms</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/book-appointment.png')">
      <img src="assets/design/sequence-diagrams/book-appointment.png" alt="UC-08 Đặt lịch hẹn" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-08/09 Đặt lịch và đổi lịch nguyên tử</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/change-appointment.png')">
      <img src="assets/design/sequence-diagrams/change-appointment.png" alt="UC-09 Đổi lịch hẹn chi tiết" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-09 Đổi lịch hẹn (kiểm tra cửa sổ 2h &amp; version)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/cancel-appointment.png')">
      <img src="assets/design/sequence-diagrams/cancel-appointment.png" alt="UC-10 Hủy lịch hẹn" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-10 Hủy lịch hẹn</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/delay-and-noshow.png')">
      <img src="assets/design/sequence-diagrams/delay-and-noshow.png" alt="UC-25/26 Báo chậm giờ và Ghi nhận NO_SHOW" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-25/26 Báo chậm giờ &amp; Vắng hẹn <code>NO_SHOW</code></div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/checkin-and-queue.png')">
      <img src="assets/design/sequence-diagrams/checkin-and-queue.png" alt="UC-19/20 Check-in và Gọi lượt" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-19/20 Check-in &amp; Gọi lượt tiếp theo</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/skip-ticket.png')">
      <img src="assets/design/sequence-diagrams/skip-ticket.png" alt="UC-21 Bỏ lượt" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-21 Bỏ lượt về cuối hàng (Lễ tân / Bác sĩ)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/consultation-progress.png')">
      <img src="assets/design/sequence-diagrams/consultation-progress.png" alt="UC-11 Tiến trình khám và hoàn tất" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-11 Tiến trình khám &amp; hoàn tất / <code>NO_SHOW</code></div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/medical-record.png')">
      <img src="assets/design/sequence-diagrams/medical-record.png" alt="UC-12/13 Hồ sơ khám chi tiết" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-12/13 Lịch sử lâm sàng, Chốt &amp; Bổ sung hồ sơ</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/prescription.png')">
      <img src="assets/design/sequence-diagrams/prescription.png" alt="UC-14 Đơn thuốc" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-14 Nháp &amp; Phát hành đơn thuốc</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/notifications.png')">
      <img src="assets/design/sequence-diagrams/notifications.png" alt="UC-15/16 Thông báo qua notification_job" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-15/16 Thông báo bất đồng bộ (<code>notification_job</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/audit-fail-closed.png')">
      <img src="assets/design/sequence-diagrams/audit-fail-closed.png" alt="M07 Ghi Audit Fail-Closed, DENIED độc lập và Trigger bất biến" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">M07 Audit Fail-Closed (<code>MANDATORY</code>), <code>DENIED</code> &amp; Trigger</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/telehealth.png')">
      <img src="assets/design/sequence-diagrams/telehealth.png" alt="UC-22/23/24 Phiên khám từ xa WebRTC" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-22/23/24 Phiên từ xa WebRTC + <code>coturn</code></div>
    </div>
  </div>
</section>

<section class="section" id="act-diag">
  <div class="sh"><span class="sh-ic">🔵</span><div class="sh-txt"><h2>Sơ đồ Activity (5 sơ đồ)</h2><p>Luồng công việc có swimlane phân tách trách nhiệm Người dùng / Hệ thống / Dữ liệu &amp; CI/CD Rollback</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/account-security-otp.png')">
      <img src="assets/design/activity-diagrams/account-security-otp.png" alt="BP-01 Đăng nhập PKCE, Google, Quên MK &amp; OTP" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">BP-01 Đăng nhập PKCE/Google, Quên MK &amp; OTP đổi email</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/booking.png')">
      <img src="assets/design/activity-diagrams/booking.png" alt="BP-02 Quy trình đặt lịch" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">BP-02 Quy trình đặt/đổi/hủy lịch — Swimlanes: Bệnh nhân / Hệ thống</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/consultation.png')">
      <img src="assets/design/activity-diagrams/consultation.png" alt="BP-03 Quy trình khám trực tiếp" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">BP-03 Quy trình khám trực tiếp — Lễ tân / Bác sĩ / Hệ thống</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/telehealth-consultation.png')">
      <img src="assets/design/activity-diagrams/telehealth-consultation.png" alt="BP-04 Quy trình khám từ xa WebRTC" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">BP-04 Quy trình khám từ xa WebRTC P2P + <code>coturn</code> 3478</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/cicd-azure-rollback.png')">
      <img src="assets/design/activity-diagrams/cicd-azure-rollback.png" alt="NFR-16 Quy trình CI/CD Azure VM, Tự động Rollback và Smoke Test" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">NFR-16 CI/CD Azure VM, Tự động Rollback &amp; Post-Deploy Smoke (6/6)</div>
    </div>
  </div>
</section>

<section class="section" id="state-diag">
  <div class="sh"><span class="sh-ic">🔁</span><div class="sh-txt"><h2>Sơ đồ Trạng thái (4 sơ đồ)</h2><p>Chuyển trạng thái hợp lệ đồng bộ 1:1 với <code>CHECK</code> &amp; <code>WorkflowService</code> / <code>TelehealthService</code> · Event [Guard] / Action</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/state-diagrams/appointment.png')">
      <img src="assets/design/state-diagrams/appointment.png" alt="Vòng đời Lịch hẹn" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Lịch hẹn: <code>[*] &rarr; CONFIRMED &rarr; CHECKED_IN &rarr; IN_PROGRESS &rarr; COMPLETED</code> (nhánh <code>CANCELLED</code>, <code>NO_SHOW</code> từ <code>CONFIRMED</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/state-diagrams/queue-ticket.png')">
      <img src="assets/design/state-diagrams/queue-ticket.png" alt="Vòng đời Phiếu chờ" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Phiếu chờ: <code>[*] &rarr; WAITING &rarr; CALLED &rarr; IN_SERVICE &rarr; DONE</code> (bỏ lượt <code>CALLED &rarr; WAITING</code> về cuối hàng, giữ nguyên ID)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/state-diagrams/medical-record.png')">
      <img src="assets/design/state-diagrams/medical-record.png" alt="Vòng đời Hồ sơ" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Hồ sơ khám: <code>DRAFT &rarr; FINAL</code> (bất biến); bổ sung tạo bản ghi <code>FINAL</code> mới có <code>supersedes_id</code> và lý do</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/state-diagrams/telehealth.png')">
      <img src="assets/design/state-diagrams/telehealth.png" alt="Vòng đời Phiên từ xa" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Phiên từ xa: <code>[*] &rarr; CREATED &rarr; WAITING &rarr; ACTIVE &harr; RECONNECTING &rarr; ENDED</code> (hoặc <code>CANCELLED</code> khi <code>NO_SHOW</code>)</div>
    </div>
  </div>
</section>

<section class="section" id="class-diag">
  <div class="sh"><span class="sh-ic">🧱</span><div class="sh-txt"><h2>Class Diagram (1 sơ đồ PIM)</h2><p>Mô hình miền UML 2.5 · đồng bộ toàn bộ 24 thực thể từ migration <code>V1..V11</code></p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/class-diagram/class-diagram.png')" style="max-width:760px">
      <img src="assets/design/class-diagram/class-diagram.png" alt="Class Diagram Domain Model" onerror="this.style.height='160px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Domain Model (PIM): <code>UserAccount</code>, <code>ContactOtp</code>, <code>ClinicHours/Holiday</code>, <code>Doctor/Slot/Appointment</code>, <code>QueueTicket/Encounter/MedicalRecord/Prescription</code>, <code>TelehealthSession/Token/Signal</code>, <code>NotificationJob/AuditEvent/IdempotencyRecord</code></div>
    </div>
  </div>
</section>

<section class="section" id="erd">
  <div class="sh"><span class="sh-ic">🗄️</span><div class="sh-txt"><h2>Entity Relationship Diagram (4 sơ đồ)</h2><p>Cấu trúc thật <strong>24 bảng MySQL 8.4 / InnoDB</strong> theo <code>Flyway V1..V11</code> · 4 góc nhìn (IE / Crow's Foot)</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/database/erd.png')">
      <img src="assets/design/database/erd.png" alt="ERD Tổng quan 24 bảng" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD Tổng quan — đủ 24 bảng <code>V1..V11</code> + trigger bất biến &amp; index hiệu năng</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/database/erd-scheduling.png')">
      <img src="assets/design/database/erd-scheduling.png" alt="ERD Nhóm Đặt lịch" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Đặt lịch, Giờ khám &amp; Ngày lễ (<code>M02–M03–M04</code>, kèm <code>V10/V11</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/database/erd-clinical.png')">
      <img src="assets/design/database/erd-clinical.png" alt="ERD Nhóm Lâm sàng" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Lâm sàng, Hàng đợi &amp; WebRTC (<code>M05–M08–M09</code>: <code>telehealth_token</code>, <code>telehealth_signal</code>, <code>items_encrypted</code>)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/database/erd-infrastructure.png')">
      <img src="assets/design/database/erd-infrastructure.png" alt="ERD Nhóm Hạ tầng" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Danh tính, OTP (<code>V9</code>), Outbox <code>notification_job</code> &amp; Kiểm toán (<code>M01–M06–M07</code>)</div>
    </div>
  </div>
</section>

<section class="section" id="arch">
  <div class="sh"><span class="sh-ic">🏛️</span><div class="sh-txt"><h2>Kiến trúc &amp; Triển khai (3 sơ đồ)</h2><p>Kruchten 4+1 Views · Layered Modular Monolith · Triển khai Docker Compose cục bộ &amp; Azure VM Internet Demo</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/architecture/system-architecture.png')">
      <img src="assets/design/architecture/system-architecture.png" alt="Kiến trúc hệ thống 4+1" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Kiến trúc hệ thống — Layered modular monolith (<code>M01–M09</code> · Kruchten 4+1)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/architecture/deployment.png')">
      <img src="assets/design/architecture/deployment.png" alt="Deployment Docker Compose local" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Triển khai cục bộ — <code>compose.yaml</code>: Frontend / Backend / MySQL 8.4 / Keycloak 26.4 / Mailpit</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/architecture/deployment-azure.png')">
      <img src="assets/design/architecture/deployment-azure.png" alt="Deployment Azure VM Internet Demo" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Triển khai Azure VM (<code>20.187.80.11</code>) — Caddy TLS/CSP · Nginx limit <code>10r/m</code> · Keycloak+Google · Brevo SMTP · <code>coturn</code> 3478 · CI auto-rollback</div>
    </div>
  </div>
  <div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <div class="ov-card"><h4>Tại sao Modular Monolith?</h4><p>Phạm vi đồ án có nhiều giao dịch ACID phối hợp nhiều thực thể (<code>Doctor &rarr; Patient &rarr; Appointment &rarr; Encounter</code>). Modular monolith giữ giao dịch nguyên tử trong MySQL và tách ranh giới dịch vụ rõ ràng mà không gánh phức tạp distributed transaction.</p></div>
    <div class="ov-card"><h4>Chống tranh chấp slot &amp; Tối ưu NFR-01</h4><p><code>SELECT ... FOR UPDATE</code> theo thứ tự khóa cố định (<code>Doctor-ID &rarr; Patient-ID</code>) tránh deadlock, kết hợp covering/window indexes (<code>V10</code>–<code>V11</code>) đưa độ trễ <code>GET /api/slots p95</code> từ 4,52 s xuống <code>7,81 ms</code> dưới tải 50 VU.</p></div>
  </div>
</section>
`;
