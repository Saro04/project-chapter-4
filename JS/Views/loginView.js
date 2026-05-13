/**
 * ============================================================
 *  VIEW: loginView.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - رسم صفحة تسجيل الدخول في DOM
 *
 *  لا يعرف هذا الملف شيئاً عن البيانات أو المنطق —
 *  فقط HTML يُحقن في الصفحة.
 * ============================================================
 */
 
const LoginView = (() => {
 
    /**
     * render()
     * يُخفي شريط التنقل ويعرض نموذج تسجيل الدخول.
     */
    function render() {
        document.getElementById('navbar').classList.add('hidden');
 
        document.getElementById('app-content').innerHTML = `
            <div class="fade-in max-w-md mx-auto mt-10">
                <div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <img src="./images/logo.png" alt="" class="w-full h-full object-contain p-2">
                        </div>
                        <h1 class="text-2xl font-bold text-gray-800">تسجيل الدخول</h1>
                        <p class="text-gray-500 text-sm mt-1">نظام التوزيع التلقائي للقاعات</p>
                    </div>
 
                    <form id="login-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
                            <input type="text" id="login-user"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                placeholder="admin / student" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                            <input type="password" id="login-pass"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                placeholder="123" required>
                        </div>
                        <button type="submit" id="login-btn"
                            class="w-full bg-primary hover:bg-teal-800 text-white font-bold py-2.5 rounded-lg transition shadow-md hover:shadow-lg flex justify-center items-center">
                            <span>دخول</span>
                            <i class="ph-bold ph-arrow-left mr-2"></i>
                        </button>
                    </form>
 
                    <div class="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-blue-800">
                        <p class="font-bold mb-1">حسابات تجريبية (للاختبار):</p>
                        <ul class="list-disc list-inside space-y-1">
                            <li>مدير النظام: <b>admin</b> / 123</li>
                            <li>طالب: <b>student</b> / 123</li>
                            <li>طالب: <b>s2</b> / 123</li>
                            <li>مشرف: <b>supervisor</b> / 123</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
 
    /**
     * setLoading(isLoading)
     * يُغيّر حالة زر الدخول (تحميل / عادي).
     */
    function setLoading(isLoading) {
        const btn = document.getElementById('login-btn');
        if (!btn) return;
        if (isLoading) {
            btn.innerHTML = `<div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>`;
            btn.disabled = true;
        } else {
            btn.innerHTML = `<span>دخول</span><i class="ph-bold ph-arrow-left mr-2"></i>`;
            btn.disabled = false;
        }
    }
 
    /**
     * showError(message)
     * يعرض رسالة خطأ للمستخدم.
     */
    function showError(message) {
        alert(message); // يمكن استبداله بـ toast notification لاحقاً
    }
 
    return { render, setLoading, showError };
 
})();