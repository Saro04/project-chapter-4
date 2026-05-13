/**
 * ============================================================
 *  VIEW: studentView.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - رسم لوحة تحكم الطالب (بطاقات الامتحانات المُخصصة له)
 *
 *  يستقبل قائمة التوزيعات جاهزة ويعرضها فقط.
 * ============================================================
 */
 
const StudentView = (() => {
 
    /**
     * render(container, allocations)
     * @param {HTMLElement} container    - العنصر الذي سيُحقن فيه HTML
     * @param {Array}       allocations  - توزيعات هذا الطالب فقط
     */
    function render(container, allocations) {
        let content = `
            <div class="fade-in space-y-6">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">📍 مكاني الامتحاني</h2>
        `;
 
        if (allocations.length > 0) {
            content += `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`;
            allocations.forEach(alloc => {
                content += `
                    <div class="border border-green-200 bg-green-50 rounded-xl p-6 text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="ph-fill ph-check-circle text-4xl text-green-600"></i>
                        </div>
                        <p class="text-sm text-green-800 mb-2">تم التوزيع بنجاح</p>
                        <div class="mt-4 space-y-3">
                            <div class="bg-white p-3 rounded shadow-sm">
                                <span class="block text-xs text-gray-500">القاعة</span>
                                <span class="font-bold text-lg text-primary">${alloc.hall}</span>
                            </div>
                            <div class="bg-white p-3 rounded shadow-sm">
                                <span class="block text-xs text-gray-500">سعة القاعة</span>
                                <span class="font-bold text-lg text-primary">${alloc.capacity}</span>
                            </div>
                            <div class="flex justify-between text-sm mt-2 pt-2 border-t">
                                <span class="text-gray-500">المادة:</span>
                                <span class="font-medium">${alloc.course}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-500">التاريخ:</span>
                                <span class="font-medium">${alloc.examDate}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-500">الوقت:</span>
                                <span class="font-medium">${alloc.examTime}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            content += `</div>`;
        } else {
            content += `
                <div class="text-center py-10">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="ph-duotone ph-warning-circle text-4xl text-gray-400"></i>
                    </div>
                    <p class="text-gray-600">لا يوجد توزيع حالياً لهذا الطالب.</p>
                </div>
            `;
        }
 
        content += `</div></div>`;
        container.innerHTML = content;
    }
 
    return { render };
 
})();
 