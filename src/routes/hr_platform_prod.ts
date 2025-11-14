import { Elysia } from 'elysia';
import { t } from "elysia";

const getHrPlatform = new Elysia({
    prefix: `${process.env.BASE_PATH || ''}/hr-platform-prod`,
    detail: {
        tags: ['hr-platform-production']
    }
});

// Get Employee Size M
getHrPlatform.get('/get-employee-detail-m', async (req) => {
    const {
        emp_id,
        posi_status,
        first_name,
        last_name,
        posi_code,
        dept_sap,
        dept_change_code,
        dept_sap_short,
        orderby
    } = req.query;

    const queryParams = new URLSearchParams();

    if (emp_id) queryParams.append('emp_id', emp_id);
    if (posi_status) queryParams.append('posi_status', posi_status);
    if (first_name) queryParams.append('first_name', first_name);
    if (last_name) queryParams.append('last_name', last_name);
    if (posi_code) queryParams.append('posi_code', posi_code);
    if (dept_sap) queryParams.append('dept_sap', dept_sap);
    if (dept_change_code) queryParams.append('dept_change_code', dept_change_code);
    if (dept_sap_short) queryParams.append('dept_sap_short', dept_sap_short);
    if (orderby) queryParams.append('orderby', orderby);

    const API_URL = `${process.env.API_URL_PROD}/get-employee-detail-m?${queryParams.toString()}`;
    const API_KEY = process.env.API_KEY_PROD;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: 200 };
    } catch (error) {
        console.error("พบปัญหาการส่งร้องขอข้อมูล: ", error);
        return { error: error instanceof Error ? error.message : 'ไม่ทราบปัญหา', status: 500 };
    }
}, {
    detail: {
        summary: "Get Employee Details (Size M) - Prod",
        description: 'ดึงข้อมูลชุดพนักงานไซส์ M จากรหัสพนักงานหรือเงื่อนไขอื่นๆ (Production Environment)',
        tags: ['HR Platform Prod'],
    },
    query: t.Object({
        emp_id: t.Optional(t.String({ example: '505291' })),
        posi_status: t.Optional(t.String({
            example: '1',
            description: 'กลุ่มพนักงาน 1 : พนง. ปกติ, 2 : ลูกจ้าง, 3 : พนง. พ้นสภาพ, 4 : พนง. ทดลองงาน — สามารถระบุเช่น 12 เพื่อเลือก 2 กลุ่ม หรือ 124 เพื่อเลือก 3 กลุ่ม'
        })),
        first_name: t.Optional(t.String({ example: 'ศรัญยู' })),
        last_name: t.Optional(t.String({ example: 'บริรัตน์ฤทธิ์' })),
        posi_code: t.Optional(t.String({ example: '1111' })),
        dept_sap: t.Optional(t.String({ example: '8526' })),
        dept_change_code: t.Optional(t.String({ example: '530203002000000' })),
        dept_sap_short: t.Optional(t.String({ example: 'กอพ.1' })),
        orderby: t.Optional(t.String({ example: 'first_name ASC' }))
    })
});

// Get Manager Structure
getHrPlatform.get('/get-manager-structure', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_PROD}/get-manager-structure?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_PROD;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: 200 };
    } catch (error) {
        console.error("พบปัญหาการส่งร้องขอข้อมูล: ", error);
        return { error: error instanceof Error ? error.message : 'ไม่ทราบปัญหา', status: 500 };
    }
}, {
    detail: {
        summary: "Get Manager by Department - Prod",
        description: 'แสดงข้อมูลผู้บังคับบัญชาหน่วยงาน และผู้ช่วยผู้บังคับบัญชาของหน่วยงาน รวมถึงผู้บังคับบัญชาสูงกว่าหนึ่งระดับ (Production Environment)',
        tags: ['HR Platform Prod'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

// Get Employee Manager
getHrPlatform.post('/get-emp-manager', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_PROD}/get-emp-manager?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_PROD;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: 200 };
    } catch (error) {
        console.error("พบปัญหาการส่งร้องขอข้อมูล: ", error);
        return { error: error instanceof Error ? error.message : 'ไม่ทราบปัญหา', status: 500 };
    }
}, {
    detail: {
        summary: "Get Manager by Department - Prod",
        description: 'แสดงข้อมูลผู้บังคับบัญชาหน่วยงาน และผู้ช่วยผู้บังคับบัญชาของหน่วยงาน รวมถึงผู้บังคับบัญชาสูงกว่าหนึ่งระดับ (Production Environment)',
        tags: ['HR Platform Prod'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

// Get Department Detail
getHrPlatform.get('/get-department-detail', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_PROD}/get-department-detail?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_PROD;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: 200 };
    } catch (error) {
        console.error("พบปัญหาการส่งร้องขอข้อมูล: ", error);
        return { error: error instanceof Error ? error.message : 'ไม่ทราบปัญหา', status: 500 };
    }
}, {
    detail: {
        summary: "Get Department Detail - Prod",
        description: 'แสดงข้อมูลรายละเอียดหน่วยงาน (Production Environment)',
        tags: ['HR Platform Prod'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

// Get Department Under
getHrPlatform.get('/get-department-under', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_PROD}/get-department-under?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_PROD;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: 200 };
    } catch (error) {
        console.error("พบปัญหาการส่งร้องขอข้อมูล: ", error);
        return { error: error instanceof Error ? error.message : 'ไม่ทราบปัญหา', status: 500 };
    }
}, {
    detail: {
        summary: "Get Department Under - Prod",
        description: 'แสดงข้อมูลสังกัดภายใต้ทั้งหมด (Production Environment)',
        tags: ['HR Platform Prod'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

// Post Department Recursive
getHrPlatform.post('/get-department-recursive', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_PROD}/get-department-recursive?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_PROD;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: 200 };
    } catch (error) {
        console.error("พบปัญหาการส่งร้องขอข้อมูล: ", error);
        return { error: error instanceof Error ? error.message : 'ไม่ทราบปัญหา', status: 500 };
    }
}, {
    detail: {
        summary: "Post Department Recursive - Prod",
        description: 'แสดงข้อมูลสังกัดแบบ recursive (Production Environment)',
        tags: ['HR Platform Prod'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

export default getHrPlatform;
