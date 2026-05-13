/**
 * ============================================================
 *  VIEW: supervisorView.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - رسم لوحة تحكم المشرف (جداول القاعات والطلاب)
 *
 *  يستقبل خريطة القاعات جاهزة من الـ Controller ويعرضها.
 * ============================================================
 */
 
const SupervisorView = (() => {
 
    /**
     * render(container, hallsMap)
     * @param {HTMLElement} container  - العنصر الذي سيُحقن فيه HTML
     * @param {Object}      hallsMap   - { "القاعة الكبرى": [alloc1, alloc2], ... }
     */
    function render(container, hallsMap) {
        let content = `<div class="fade-in space-y-6">`;
 
        if (Object.keys(hallsMap).length > 0) {
            for (const [hall, students] of Object.entries(hallsMap)) {
                content += `
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div class="bg-primary text-white p-4 flex justify-between items-center">
                            <h2 class="text-lg font-bold flex items-center gap-2">
                                <i class="ph-fill ph-map-pin"></i> ${hall}
                            </h2>
                            <span class="bg-white/20 px-3 py-1 rounded-full text-sm">${students.length} طالب</span>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-right text-sm">
                                <thead class="bg-gray-50 text-gray-600 border-b">
                                    <tr>
                                        <th class="p-3">اسم الطالب</th>
                                        <th class="p-3">المادة</th>
                                        <th class="p-3">سعة القاعة</th>
                                        <th class="p-3">الوقت</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y">
                                    ${students.map(s => `
                                        <tr>
                                            <td class="p-3 font-medium">${s.studentName}</td>
                                            <td class="p-3">${s.course}</td>
                                            <td class="p-3 font-bold text-primary">${s.capacity}</td>
                                            <td class="p-3 text-gray-500">${s.examTime}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
        } else {
            content += `
                <div class="bg-white p-10 rounded-xl shadow-sm text-center">
                    <p class="text-gray-600">لم يتم إسناد أي قاعات لك حالياً.</p>
                </div>
            `;
        }
 
        content += `</div>`;
        container.innerHTML = content;
    }
 
    return { render };
 
})();