/**
 * ============================================================
 *  MODEL: userModel.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - تخزين بيانات المستخدمين (قاعدة البيانات الوهمية)
 *  - توفير دوال للبحث عن مستخدم والتحقق من كلمة المرور
 *  - إدارة الجلسة (session) في localStorage
 *
 *  لا يعرف هذا الملف شيئاً عن HTML أو الواجهة —
 *  فقط بيانات وعمليات عليها.
 * ============================================================
 */
 
const UserModel = (() => {
 
    // ── قاعدة البيانات الوهمية (Simulating MongoDB) ──────────
    const _users = [
        { id: 1, username: "admin",      password: "123", role: "admin",      name: "مدير النظام" },
        { id: 2, username: "student",    password: "123", role: "student",    name: "أحمد محمد"   },
        { id: 3, username: "supervisor", password: "123", role: "supervisor", name: "د. سارة علي" },
        { id: 4, username: "s2",         password: "123", role: "student",    name: "منى خالد"    }
    ];
 
    const SESSION_KEY = 'uni_session';
 
    // ── دوال عامة (Public API) ────────────────────────────────
 
    /**
     * findUser(username, password)
     * يبحث عن مستخدم يطابق اسم المستخدم وكلمة المرور.
     * يُرجع كائن المستخدم بدون كلمة المرور، أو null إن لم يجد.
     */
    function findUser(username, password) {
        const user = _users.find(
            u => u.username === username && u.password === password
        );
        if (!user) return null;
 
        // نُرجع نسخة بدون كلمة المرور (أمان)
        const { password: _, ...safeUser } = user;
        return safeUser;
    }
 
    /**
     * saveSession(user)
     * يحفظ بيانات المستخدم في localStorage.
     */
    function saveSession(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
 
    /**
     * getSession()
     * يسترجع بيانات المستخدم من localStorage.
     * يُرجع الكائن أو null إن لم توجد جلسة.
     */
    function getSession() {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    }
 
    /**
     * clearSession()
     * يحذف الجلسة من localStorage عند تسجيل الخروج.
     */
    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }
 
    // ── نُصدّر الدوال العامة فقط ──────────────────────────────
    return { findUser, saveSession, getSession, clearSession };
 
})();