/**
 * ============================================================
 *  MODEL: allocationModel.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - تخزين بيانات التوزيعات (allocations)
 *  - توفير دوال للفلترة والبحث والإحصاء
 *  - إضافة / تعديل / حذف التوزيعات
 *
 *  لا يعرف هذا الملف شيئاً عن HTML أو الواجهة —
 *  فقط بيانات وعمليات عليها.
 * ============================================================
 */
 
const AllocationModel = (() => {
 
    // ── قاعدة البيانات الوهمية ────────────────────────────────
    let _allocations = [
        {
            id: 101, studentId: 2, studentName: "أحمد محمد",
            hall: "القاعة الكبرى (A)", capacity: 120,
            supervisorName: "د. سارة علي",
            examDate: "2024-01-15", examTime: "09:00 ص", course: "برمجة ويب"
        },
        {
            id: 102, studentId: 4, studentName: "منى خالد",
            hall: "القاعة الصغرى (B)", capacity: 60,
            supervisorName: "أ. عمر يوسف",
            examDate: "2024-01-16", examTime: "11:00 ص", course: "قواعد بيانات"
        },
        {
            id: 103, studentId: 99, studentName: "علي حسن",
            hall: "القاعة الكبرى (A)", capacity: 120,
            supervisorName: "د. سارة علي",
            examDate: "2024-01-15", examTime: "09:00 ص", course: "برمجة ويب"
        }
    ];
 
    // مُولّد ID تلقائي للسجلات الجديدة
    let _nextId = 200;
 
    // ── دوال القراءة ──────────────────────────────────────────
 
    /** يُرجع كل التوزيعات */
    function getAll() {
        return [..._allocations]; // نسخة للحماية من التعديل المباشر
    }
 
    /** يُرجع توزيعات طالب محدد بـ studentId */
    function getByStudentId(studentId) {
        return _allocations.filter(a => a.studentId === studentId);
    }
 
    /** يُرجع توزيعات قاعة مشرف محدد بـ supervisorName */
    function getBySupervisorName(supervisorName) {
        return _allocations.filter(a => a.supervisorName === supervisorName);
    }
 
    /**
     * يُرجع التوزيعات المُجمَّعة حسب اسم القاعة:
     * { "القاعة الكبرى (A)": [ alloc1, alloc3 ], ... }
     */
    function groupByHall(allocations) {
        return allocations.reduce((map, a) => {
            if (!map[a.hall]) map[a.hall] = [];
            map[a.hall].push(a);
            return map;
        }, {});
    }
 
    /** يُرجع إحصاءات عامة للوحة تحكم المدير */
    function getStats() {
        return {
            totalAllocations: _allocations.length,
            totalHalls:        [...new Set(_allocations.map(a => a.hall))].length,
            totalSupervisors:  [...new Set(_allocations.map(a => a.supervisorName))].length
        };
    }
 
    // ── دوال الكتابة ──────────────────────────────────────────
 
    /** يضيف توزيعاً جديداً ويُرجع الكائن المُضاف */
    function addAllocation(data) {
        const newAlloc = { id: _nextId++, ...data };
        _allocations.push(newAlloc);
        return newAlloc;
    }
 
    /** يعدّل توزيعاً موجوداً بـ id ويُرجع true إن نجح */
    function updateAllocation(id, data) {
        const idx = _allocations.findIndex(a => a.id === id);
        if (idx === -1) return false;
        _allocations[idx] = { ..._allocations[idx], ...data };
        return true;
    }
 
    /** يحذف توزيعاً بـ id ويُرجع true إن نجح */
    function deleteAllocation(id) {
        const before = _allocations.length;
        _allocations = _allocations.filter(a => a.id !== id);
        return _allocations.length < before;
    }
 
    // ── تصدير الدوال العامة ───────────────────────────────────
    return {
        getAll,
        getByStudentId,
        getBySupervisorName,
        groupByHall,
        getStats,
        addAllocation,
        updateAllocation,
        deleteAllocation
    };
 
})();