/**
 * ============================================================
 *  CONTROLLER: allocationController.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - تحديد أي View يُعرض بناءً على دور المستخدم
 *  - التعامل مع أحداث الفلترة، الإضافة، التعديل، الحذف
 *  - يقرأ من الـ Model → يقرر → يأمر الـ View
 * ============================================================
 */
 
const AllocationController = (() => {
 
    /**
     * showDashboard(user)
     * الـ Router الرئيسي: يوجّه كل دور إلى الـ View الصحيح.
     * @param {Object} user - كائن المستخدم الحالي
     */
    function showDashboard(user) {
        // أظهر شريط التنقل وضع اسم المستخدم
        const navbar = document.getElementById('navbar');
        navbar.classList.remove('hidden');
        document.getElementById('user-display').textContent = `مرحباً، ${user.name}`;
 
        const container = document.getElementById('app-content');
 
        // وجّه حسب الدور
        switch (user.role) {
            case 'admin':
                _showAdmin(container);
                break;
            case 'student':
                _showStudent(container, user.id);
                break;
            case 'supervisor':
                _showSupervisor(container, user.name);
                break;
            default:
                container.innerHTML = `<p class="text-red-500">دور غير معروف</p>`;
        }
    }
 
    // ── دوال التوجيه الداخلية (Private Routers) ──────────────
 
    /**
     * _showAdmin(container)
     * يجمع البيانات من الـ Model ويمررها للـ AdminView.
     * بعد الرسم يربط أحداث البحث والإضافة والحذف والتعديل.
     */
    function _showAdmin(container) {
        const stats       = AllocationModel.getStats();      // Model: احضر الإحصاء
        const allocations = AllocationModel.getAll();        // Model: احضر كل التوزيعات
 
        AdminView.render(container, stats, allocations);     // View: ارسم
 
        // ربط الأحداث بعد رسم الـ DOM
        _attachAdminEvents();
    }
 
    /**
     * _showStudent(container, studentId)
     */
    function _showStudent(container, studentId) {
        const allocations = AllocationModel.getByStudentId(studentId); // Model
        StudentView.render(container, allocations);                     // View
    }
 
    /**
     * _showSupervisor(container, supervisorName)
     */
    function _showSupervisor(container, supervisorName) {
        const myAllocations = AllocationModel.getBySupervisorName(supervisorName); // Model
        const hallsMap      = AllocationModel.groupByHall(myAllocations);          // Model
        SupervisorView.render(container, hallsMap);                                 // View
    }
 
    // ── ربط أحداث لوحة المدير ────────────────────────────────
 
    function _attachAdminEvents() {
        // حدث البحث/الفلترة
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => filterTable(e.target.value));
        }
 
        // حدث زر الإضافة
        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', addAllocation);
        }
 
        // أحداث الحذف والتعديل (Event Delegation على الجدول)
        const table = document.getElementById('allocations-table');
        if (table) {
            table.addEventListener('click', (e) => {
                const deleteBtn = e.target.closest('.delete-btn');
                const editBtn   = e.target.closest('.edit-btn');
 
                if (deleteBtn) {
                    const id = parseInt(deleteBtn.dataset.id);
                    deleteAllocation(id);
                }
                if (editBtn) {
                    const id = parseInt(editBtn.dataset.id);
                    editAllocation(id);
                }
            });
        }
    }
 
    // ── دوال العمليات (Actions) ───────────────────────────────
 
    /**
     * filterTable(query)
     * يُخفي/يُظهر صفوف الجدول حسب البحث.
     * هذه عملية UI بحتة لا تحتاج الـ Model.
     */
    function filterTable(query) {
        const rows = document.querySelectorAll('#allocations-table tbody tr');
        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            row.style.display = name.includes(query.toLowerCase()) ? '' : 'none';
        });
    }
 
    /**
     * addAllocation()
     * مثال: يضيف توزيعاً وهمياً ويُحدّث الواجهة.
     * في مشروع حقيقي: يفتح مودال أو يقرأ نموذج.
     */
    function addAllocation() {
        const newData = {
            studentId:      99,
            studentName:    "طالب جديد",
            hall:           "القاعة الكبرى (A)",
            capacity:       120,
            supervisorName: "د. سارة علي",
            examDate:       "2024-02-01",
            examTime:       "10:00 ص",
            course:         "مادة جديدة"
        };
 
        AllocationModel.addAllocation(newData);      // Model: أضف البيانات
        _showAdmin(document.getElementById('app-content')); // View: أعِد الرسم
    }
 
    /**
     * deleteAllocation(id)
     */
    function deleteAllocation(id) {
        if (!confirm('هل تريد حذف هذا التوزيع؟')) return;
        AllocationModel.deleteAllocation(id);                   // Model: احذف
        _showAdmin(document.getElementById('app-content'));     // View: أعِد الرسم
    }
 
    /**
     * editAllocation(id)
     * مثال بسيط — في مشروع حقيقي يفتح مودال تعديل.
     */
    function editAllocation(id) {
        alert(`تعديل التوزيع رقم ${id} — يمكنك هنا فتح مودال التعديل`);
    }
 
    return { showDashboard, filterTable, addAllocation, deleteAllocation, editAllocation };
 
})();
 