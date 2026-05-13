/**
 * ============================================================
 *  CONTROLLER: authController.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - التحكم في عملية تسجيل الدخول والخروج
 *  - يقرأ من الـ Model → يقرر → يأمر الـ View بالرسم
 *
 *  هذا الملف هو الوسيط:
 *    View (نموذج الدخول) → Controller → Model (التحقق) → View (لوحة التحكم)
 * ============================================================
 */
 
const AuthController = (() => {
 
    /**
     * init()
     * نقطة بداية التطبيق — يُستدعى عند تحميل الصفحة.
     * يتحقق من وجود جلسة محفوظة ويوجّه المستخدم.
     */
    function init() {
        const session = UserModel.getSession(); // اسأل الـ Model
        if (session) {
            // يوجد جلسة → اعرض لوحة التحكم مباشرة
            AllocationController.showDashboard(session);
        } else {
            // لا يوجد جلسة → اعرض صفحة الدخول
            LoginView.render();
            _attachLoginListener();
        }
    }
 
    /**
     * _attachLoginListener() — دالة داخلية (private)
     * يربط حدث submit في نموذج الدخول بدالة handleLogin.
     * نفصل ربط الأحداث عن الـ View لأن الـ View لا يعرف الـ Controller.
     */
    function _attachLoginListener() {
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', handleLogin);
        }
    }
 
    /**
     * handleLogin(event)
     * يُعالج محاولة تسجيل الدخول:
     * 1. يمنع إعادة تحميل الصفحة
     * 2. يقرأ قيم الحقول من DOM
     * 3. يسأل الـ Model عن المستخدم
     * 4. إن نجح → يحفظ الجلسة ويعرض لوحة التحكم
     * 5. إن فشل → يعرض رسالة خطأ
     */
    async function handleLogin(e) {
        e.preventDefault();
 
        const username = document.getElementById('login-user').value.trim();
        const password = document.getElementById('login-pass').value.trim();
 
        // أخبر الـ View بعرض حالة التحميل
        LoginView.setLoading(true);
 
        // محاكاة تأخير الشبكة (Network delay)
        await new Promise(r => setTimeout(r, 800));
 
        // اسأل الـ Model: هل هذا المستخدم موجود؟
        const user = UserModel.findUser(username, password);
 
        if (user) {
            // نجح التحقق → احفظ الجلسة في الـ Model
            UserModel.saveSession(user);
            // وجّه إلى لوحة التحكم المناسبة
            AllocationController.showDashboard(user);
        } else {
            // فشل التحقق → أوقف التحميل وأظهر الخطأ
            LoginView.setLoading(false);
            LoginView.showError('بيانات الدخول غير صحيحة');
        }
    }
 
    /**
     * logout()
     * يُسجّل خروج المستخدم:
     * 1. يأمر الـ Model بحذف الجلسة
     * 2. يأمر الـ View بعرض صفحة الدخول مجدداً
     */
    function logout() {
        UserModel.clearSession();                               // Model: احذف الجلسة
        document.getElementById('navbar').classList.add('hidden');
        LoginView.render();                                     // View: ارسم صفحة الدخول
        _attachLoginListener();                                 // أعِد ربط الحدث
    }
 
    return { init, logout };
 
})();
 