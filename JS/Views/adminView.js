/**
 * ============================================================
 *  VIEW: adminView.js
 * ============================================================
 *  المسؤولية الوحيدة لهذا الملف:
 *  - رسم لوحة تحكم المدير (إحصاءات + جدول التوزيعات)
 *
 *  يستقبل البيانات جاهزة من الـ Controller ويعرضها فقط.
 *  لا يجلب البيانات بنفسه ولا يحتوي منطق عمل.
 * ============================================================
 */
 
const AdminView = (() => {
 
    /**
     * render(container, stats, allocations)
     * @param {HTMLElement} container  - العنصر الذي سيُحقن فيه HTML
     * @param {Object}      stats      - { totalAllocations, totalHalls, totalSupervisors }
     * @param {Array}       allocations - مصفوفة التوزيعات الكاملة
     */
    function render(container, stats, allocations) {
        container.innerHTML = `
            <div class="fade-in space-y-8">
 
                <!-- بطاقات الإحصاء -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-sm border-r-4 border-primary">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-gray-500 text-sm">إجمالي التوزيعات</p>
                                <h3 class="text-3xl font-bold text-gray-800 mt-1">${stats.totalAllocations}</h3>
                            </div>
                            <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-primary">
                                <i class="ph-fill ph-users text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border-r-4 border-blue-500">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-gray-500 text-sm">عدد القاعات المستخدمة</p>
                                <h3 class="text-3xl font-bold text-gray-800 mt-1">${stats.totalHalls}</h3>
                            </div>
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                                <i class="ph-fill ph-map-pin text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border-r-4 border-amber-500">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-gray-500 text-sm">المراقبين المسندين</p>
                                <h3 class="text-3xl font-bold text-gray-800 mt-1">${stats.totalSupervisors}</h3>
                            </div>
                            <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-500">
                                <i class="ph-fill ph-chalkboard-teacher text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
 
                <!-- جدول التوزيعات -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 class="text-xl font-bold text-gray-800">قائمة التوزيعات</h2>
                        <div class="flex gap-2 w-full sm:w-auto">
                            <input type="text" id="search-input"
                                placeholder="بحث باسم الطالب..."
                                class="w-full sm:w-64 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
                            <button id="add-btn"
                                class="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-800 transition whitespace-nowrap">
                                <i class="ph-bold ph-plus-circle ml-1"></i> إضافة
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-right" id="allocations-table">
                            <thead class="bg-gray-50 text-gray-600 text-sm font-medium">
                                <tr>
                                    <th class="p-4">اسم الطالب</th>
                                    <th class="p-4">القاعة</th>
                                    <th class="p-4">سعة القاعة</th>
                                    <th class="p-4">المادة</th>
                                    <th class="p-4">المراقب</th>
                                    <th class="p-4">التاريخ</th>
                                    <th class="p-4">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100 text-sm">
                                ${_renderRows(allocations)}
                            </tbody>
                        </table>
                    </div>
                </div>
 
            </div>
        `;
    }
 
    /**
     * _renderRows(allocations) — دالة مساعدة داخلية (private)
     * تولّد صفوف الجدول من مصفوفة التوزيعات.
     */
    function _renderRows(allocations) {
        return allocations.map(row => `
            <tr class="hover:bg-gray-50 transition" data-id="${row.id}">
                <td class="p-4 font-medium">${row.studentName}</td>
                <td class="p-4">
                    <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">${row.hall}</span>
                </td>
                <td class="p-4 font-semibold text-primary">${row.capacity}</td>
                <td class="p-4">${row.course}</td>
                <td class="p-4 text-gray-500">${row.supervisorName}</td>
                <td class="p-4 text-gray-500">${row.examDate}</td>
                <td class="p-4">
                    <button class="edit-btn text-blue-600 hover:text-blue-800 ml-2" data-id="${row.id}" title="تعديل">
                        <i class="ph-bold ph-pencil-simple"></i>
                    </button>
                    <button class="delete-btn text-red-500 hover:text-red-700" data-id="${row.id}" title="حذف">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
 
    return { render };
 
})();