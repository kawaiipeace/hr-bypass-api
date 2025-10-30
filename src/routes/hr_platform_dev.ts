import { Elysia } from 'elysia';
import { t } from "elysia";

const getHrPlatform = new Elysia({
    prefix: '/hr-platform-dev',
    detail: {
        tags: ['hr-platform-development']
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

    const API_URL = `${process.env.API_URL_DEV}/get-employee-detail-m?${queryParams.toString()}`;
    const API_KEY = process.env.API_KEY_DEV;

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
        summary: "Get Employee Details (Size M) - Dev",
        description: 'ดึงข้อมูลชุดพนักงานไซส์ M จากรหัสพนักงานหรือเงื่อนไขอื่นๆ (Development Environment)',
        tags: ['HR Platform Dev'],
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

// Get Manager
getHrPlatform.get('/get-manager', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_DEV}/get-manager?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_DEV;

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
        summary: "Get Manager by Department - Dev",
        description: 'แสดงข้อมูลผู้บังคับบัญชาหน่วยงาน และผู้ช่วยผู้บังคับบัญชาของหน่วยงาน รวมถึงผู้บังคับบัญชาสูงกว่าหนึ่งระดับ (Development Environment)',
        tags: ['HR Platform Dev'],
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

    const API_URL = `${process.env.API_URL_DEV}/get-department-detail?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_DEV;

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
        summary: "Get Department Detail - Dev",
        description: 'แสดงข้อมูลรายละเอียดหน่วยงาน (Development Environment)',
        tags: ['HR Platform Dev'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

// Get Employee Position Department
getHrPlatform.get('/get-employee-posi-dept', async (req) => {

    const API_URL = `${process.env.API_URL_DEV}/get-employee-posi-dept`;
    const API_KEY = process.env.API_KEY_DEV;

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
        summary: "Get Employee Position Department - Dev",
        description: 'สำหรับเรียกข้อมูลพนักงาน รหัสสังกัด รหัสตำแหน่งเพื่ออัพเดทในปริมาณมาก (Development Environment)',
        tags: ['HR Platform Dev'],
    },
});

// Get Department Under
getHrPlatform.get('/get-department-under', async (req) => {
    const dept_sap = req.query.dept_sap;

    if (!dept_sap) {
        return { "ไม่มีรหัสแผนก": 400 };
    }

    const API_URL = `${process.env.API_URL_DEV}/get-department-under?dept_sap=${dept_sap}`;
    const API_KEY = process.env.API_KEY_DEV;

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
        summary: "Get Department Under - Dev",
        description: 'แสดงข้อมูลสังกัดภายใต้ทั้งหมด (Development Environment)',
        tags: ['HR Platform Dev'],
    },
    query: t.Object({
        dept_sap: t.String({ example: '8507' })
    })
});

export default getHrPlatform;
