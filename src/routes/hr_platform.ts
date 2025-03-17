import { Elysia } from 'elysia';
import { t } from "elysia";

const getHrPlatform = new Elysia({
    prefix: '/hr-platform',
    detail: {
        tags: ['hr-platform']
    }
});

// Get Employee Size M
getHrPlatform.get('/get-employee-detail-m', async (req) => {
    const emp_id = req.query.emp_id;

    if (!emp_id) {
        return { "ไม่มีรหัสพนักงาน": 400 };
    }

    const API_URL = `${process.env.PROXY_HOST}/get-employee-detail-m?emp_id=${emp_id}`;
    const API_KEY = process.env.API_KEY;

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
        summary: "Get Employee Details (Size M)",
        description: 'ดึงข้อมูลชุดพนักงานไซส์ M จากรหัสพนักงาน',
        tags: ['HR Platform'],
    },
    query: t.Object({
        emp_id: t.String({ example: '505291' })
    })
});

// Get Manager
getHrPlatform.get('/get-manager', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.PROXY_HOST}/get-manager?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY;

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
        summary: "Get Manager by Department",
        description: 'แสดงข้อมูลผู้บังคับบัญชาหน่วยงาน และผู้ช่วยผู้บังคับบัญชาของหน่วยงาน รวมถึงผู้บังคับบัญชาสูงกว่าหนึ่งระดับ',
        tags: ['HR Platform'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '7306' })
    })
});

// Get Department Detail
getHrPlatform.get('/get-department-detail', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.PROXY_HOST}/get-department-detail?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY;

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
        summary: "Get Department Detail",
        description: 'แสดงข้อมูลรายละเอียดหน่วยงาน',
        tags: ['HR Platform'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '0' })
    })
});

// Get Employee in Department
getHrPlatform.get('/get-emp-indept', async (req) => {
    const { dept_sap, posi_status } = req.query;

    if (!dept_sap) {
        return { message: "ไม่มีรหัสแผนก", status: 400 };
    }

    const API_URL = `${process.env.PROXY_HOST}/get-emp-indept?dept_sap=${dept_sap}${posi_status ? `&posi_status=${posi_status}` : ''}`;
    const API_KEY = process.env.API_KEY;

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
        summary: "Get Employee in Department",
        description: 'แสดงข้อมูลพนักงานภายใต้สังกัด',
        tags: ['HR Platform'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '0' }),
        posi_status: t.String({ example: 'active' }), // Mark posi_status as optional
    })
});

// Get Employee Position Department
getHrPlatform.get('/get-employee-posi-dept', async (req) => {
    const { dept_sap, posi_status } = req.query;

    if (!dept_sap) {
        return { message: "ไม่มีรหัสแผนก", status: 400 };
    }

    const API_URL = `${process.env.PROXY_HOST}/get-employee-posi-dept`;
    const API_KEY = process.env.API_KEY;

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
        summary: "Get Employee Position Department",
        description: 'สำหรับเรียกข้อมูลพนักงาน รหัสสังกัด รหัสตำแหน่งเพื่ออัพเดทในปริมาณมาก',
        tags: ['HR Platform'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '0' }),
        posi_status: t.String({ example: 'active' }), // Mark posi_status as optional
    })
});

// Get Department Under
getHrPlatform.get('/get-department-under', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.PROXY_HOST}/get-department-under?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY;

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
        summary: "Get Department Under",
        description: 'แสดงข้อมูลสังกัดภายใต้ทั้งหมด',
        tags: ['HR Platform'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '7306' })
    })
});

export default getHrPlatform;
