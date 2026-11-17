/* sections/diagrams.js — Use Case / Sequence / Activity / State / Class / ERD / Architecture */
/* Chỉnh đường dẫn ảnh nếu cần: prefix assets/design/ */

window.SECTION_DIAGRAMS = `
<section class="section" id="uc-diag">
  <div class="sh"><span class="sh-ic">🗂️</span><div class="sh-txt"><h2>Sơ đồ Use Case</h2><p>Nhấn vào ảnh để phóng to · Tổng quan 24 UC và 4 bản nhóm theo actor/module</p></div></div>

  <p style="font-size:12px;color:var(--txt3);margin-bottom:12px">Sơ đồ tổng quan — tất cả 24 UC</p>
  <div style="margin-bottom:24px">
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-diagram.png')" style="max-width:860px;cursor:zoom-in">
      <img src="assets/design/use-case/use-case-diagram.png" alt="Use Case Tổng quan" style="width:100%;height:520px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Tổng quan Use Case — tất cả 24 UC (nhấn để phóng to)</div>
    </div>
  </div>

  <p style="font-size:12px;color:var(--txt3);margin-bottom:12px">Sơ đồ chi tiết theo nhóm</p>
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px">
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-1.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-1.png" alt="UC Nhóm 1" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Danh tính &amp; danh mục — UC-01..06 (M01-M02)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-2.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-2.png" alt="UC Nhóm 2" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Lịch hẹn &amp; hàng đợi — UC-07..11, 19..21 (M03-M04-M08)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-3.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-3.png" alt="UC Nhóm 3" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Chăm sóc lâm sàng &amp; y tế từ xa — UC-12..14, 22..24 (M05-M09)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/use-case/use-case-4.png')" style="cursor:zoom-in">
      <img src="assets/design/use-case/use-case-4.png" alt="UC Nhóm 4" style="width:100%;height:340px;object-fit:contain;background:var(--sb2)" onerror="this.style.height='80px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Thông báo &amp; kiểm toán — UC-15..18 (M06-M07)</div>
    </div>
  </div>
</section>

<section class="section" id="seq-diag">
  <div class="sh"><span class="sh-ic">🔄</span><div class="sh-txt"><h2>Sơ đồ Sequence</h2><p>Luồng thông điệp theo thời gian · 9 PNG + UC-09 Mermaid inline</p></div></div>
  <div class="img-grid" style="margin-bottom:24px">
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/book-appointment.png')">
      <img src="assets/design/sequence-diagrams/book-appointment.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-08 Đặt lịch hẹn</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/cancel-appointment.png')">
      <img src="assets/design/sequence-diagrams/cancel-appointment.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-10 Hủy lịch hẹn</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/checkin-and-queue.png')">
      <img src="assets/design/sequence-diagrams/checkin-and-queue.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-19/20 Check-in &amp; Hàng đợi</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/consultation-progress.png')">
      <img src="assets/design/sequence-diagrams/consultation-progress.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-12/13 Khám và hồ sơ</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/medical-record.png')">
      <img src="assets/design/sequence-diagrams/medical-record.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-13 Hồ sơ khám chi tiết</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/prescription.png')">
      <img src="assets/design/sequence-diagrams/prescription.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-14 Đơn thuốc</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/notifications.png')">
      <img src="assets/design/sequence-diagrams/notifications.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-16 Thông báo &amp; Outbox</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/telehealth.png')">
      <img src="assets/design/sequence-diagrams/telehealth.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-23/24 Phiên từ xa</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/skip-ticket.png')">
      <img src="assets/design/sequence-diagrams/skip-ticket.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-21 Bỏ lượt</div>
    </div>
  </div>

  <h3 style="font-size:14px;color:var(--txt2);margin-bottom:12px">UC-09 Đổi lịch — Sequence Diagram (nguồn: <code style="font-size:11px">docs/design/sequence-diagrams/change-appointment.puml</code>)</h3>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/sequence-diagrams/change-appointment.png')">
      <img src="assets/design/sequence-diagrams/change-appointment.png" alt="UC-09 Đổi lịch hẹn" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">UC-09 Đổi lịch hẹn</div>
    </div>
  </div>
</section>

<section class="section" id="act-diag">
  <div class="sh"><span class="sh-ic">🔵</span><div class="sh-txt"><h2>Sơ đồ Activity</h2><p>Luồng công việc có swimlane · Fork/Join cho quy trình song song</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/booking.png')">
      <img src="assets/design/activity-diagrams/booking.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Quy trình đặt lịch — Swimlanes: Bệnh nhân / Hệ thống / DB</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/consultation.png')">
      <img src="assets/design/activity-diagrams/consultation.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Quy trình khám trực tiếp — Swimlanes: Lễ tân / Bác sĩ / Hệ thống</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/activity-diagrams/telehealth-consultation.png')">
      <img src="assets/design/activity-diagrams/telehealth-consultation.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Quy trình khám từ xa — WebRTC Signaling / Token / Media</div>
    </div>
  </div>
</section>

<section class="section" id="state-diag">
  <div class="sh"><span class="sh-ic">🔁</span><div class="sh-txt"><h2>Sơ đồ Trạng thái</h2><p>Chuyển trạng thái hợp lệ · Event [Guard] / Action</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/state-diagrams/appointment.png')">
      <img src="assets/design/state-diagrams/appointment.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Trạng thái Lịch hẹn: PENDING → CONFIRMED → CHECKED_IN → IN_PROGRESS → COMPLETED / CANCELLED / NO_SHOW</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/state-diagrams/queue-ticket.png')">
      <img src="assets/design/state-diagrams/queue-ticket.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Trạng thái Phiếu chờ: WAITING → IN_SERVICE → COMPLETED / SKIPPED</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/state-diagrams/medical-record.png')">
      <img src="assets/design/state-diagrams/medical-record.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Trạng thái Hồ sơ: DRAFT → FINAL (bất biến) → AMENDED (tạo version mới)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/state-diagrams/telehealth.png')">
      <img src="assets/design/state-diagrams/telehealth.png" alt="" onerror="this.style.height='100px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Trạng thái Phiên từ xa: WAITING_ROOM → ACTIVE → ENDED / EXPIRED</div>
    </div>
  </div>
</section>

<section class="section" id="class-diag">
  <div class="sh"><span class="sh-ic">🧱</span><div class="sh-txt"><h2>Class Diagram</h2><p>Cấu trúc tĩnh nghiệp vụ · Association / Aggregation / Composition</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/class-diagram/class-diagram.png')" style="max-width:600px">
      <img src="assets/design/class-diagram/class-diagram.png" alt="" onerror="this.style.height='160px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Class Diagram — Domain model: Appointment, Doctor, Patient, MedicalRecord, QueueTicket, Encounter, Prescription, AuditEvent</div>
    </div>
  </div>
</section>

<section class="section" id="erd">
  <div class="sh"><span class="sh-ic">🗄️</span><div class="sh-txt"><h2>Entity Relationship Diagram</h2><p>Cấu trúc MySQL · 4 góc nhìn: tổng quan + 3 nhóm chức năng</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/database/erd.png')">
      <img src="assets/design/database/erd.png" alt="" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Tổng quan toàn bộ entity</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/database/erd-scheduling.png')">
      <img src="assets/design/database/erd-scheduling.png" alt="" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Nhóm Đặt lịch (M03–M04–M08)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/database/erd-clinical.png')">
      <img src="assets/design/database/erd-clinical.png" alt="" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Nhóm Lâm sàng (M05 MedicalRecord / Prescription)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/database/erd-infrastructure.png')">
      <img src="assets/design/database/erd-infrastructure.png" alt="" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">ERD — Nhóm Hạ tầng (M06 Notification / M07 Audit)</div>
    </div>
  </div>
</section>

<section class="section" id="arch">
  <div class="sh"><span class="sh-ic">🏛️</span><div class="sh-txt"><h2>Kiến trúc hệ thống</h2><p>Modular monolith · mô hình 4+1 Views · deployment Docker Compose</p></div></div>
  <div class="img-grid">
    <div class="img-card" onclick="lb('assets/design/architecture/system-architecture.png')">
      <img src="assets/design/architecture/system-architecture.png" alt="" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Kiến trúc hệ thống — Layered modular monolith (4+1 Views)</div>
    </div>
    <div class="img-card" onclick="lb('assets/design/architecture/deployment.png')">
      <img src="assets/design/architecture/deployment.png" alt="" onerror="this.style.height='120px';this.alt='Không tìm thấy ảnh'">
      <div class="ic-label">Deployment — Docker Compose: Backend / MySQL / Keycloak / Mailpit / Frontend</div>
    </div>
  </div>
  <div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <div class="ov-card"><h4>Tại sao Modular Monolith?</h4><p>Phạm vi đồ án có nhiều giao dịch phối hợp nhiều entity. Monolith giữ giao dịch và triển khai thống nhất, tách trách nhiệm theo module. Microservice sẽ đẩy vấn đề saga/distributed transaction vào phạm vi không cần thiết.</p></div>
    <div class="ov-card"><h4>Chống tranh chấp slot</h4><p>SELECT … FOR UPDATE trong giao dịch MySQL; kiểm tra xung đột trước INSERT; unique constraint là lớp phòng thủ cuối cùng. Lock ordering cố định (Doctor-ID → Patient-ID) tránh deadlock khi 2 request đổi lịch đồng thời.</p></div>
  </div>
</section>
`;
