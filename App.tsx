/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RtnCalendar } from '@nghiavuive/rtn-calendar';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,

} from 'react-native';
import moment from 'moment'; // Import thư viện moment






const jobData = [
    {
        id: 'day-1',
        date: new Date("2024-10-21"), // 21/10/2024
        events: [
            {
                id: 'job-1',
                start: new Date("2024-10-21T08:00:00"), // 08:00
                name: "Project Manager",
                priority: 'high', // Thay đổi priority thành 'high'
                duration: 600, // 10 giờ
                isAllDay: false
            },
            {
                id: 'job-2',
                start: new Date("2024-10-21T09:00:00"), // 09:00
                name: "Designer",
                priority: 'medium', // Thay đổi priority thành 'medium'
                duration: 480, // 8 giờ
                isAllDay: false
            }
        ]
    },
    {
        id: 'day-2',
        date: new Date("2034-10-22"), // 22/10/2024
        events: [
            {
                id: 'job-3',
                start: new Date("2024-10-22T10:00:00"), // 10:00
                name: "Team Lead",
                priority: 'medium',
                duration: 480, // 8 giờ
                isAllDay: false
            },
            {
                id: 'job-4',
                start: new Date("2024-10-22T13:00:00"), // 13:00
                name: "QA Specialist",
                priority: 'low', // Thay đổi priority thành 'low'
                duration: 120, // 2 giờ
                isAllDay: false
            }
        ]
    },
    {
        id: 'day-3',
        date: new Date("2024-10-23"), // 23/10/2024
        events: [
            {
                id: 'job-5',
                start: new Date("2024-10-23T08:00:00"), // 08:00
                name: "Developer",
                priority: 'medium',
                duration: 240, // 4 giờ
                isAllDay: false
            },
            {
                id: 'job-6',
                start: new Date("2024-10-23T13:00:00"), // 13:00
                name: "Freelancer",
                priority: 'high',
                duration: 240, // 4 giờ
                isAllDay: false
            }
        ]
    },
    {
        id: 'day-4',
        date: new Date("2024-10-24"), // 24/10/2024
        events: [
            {
                id: 'job-7',
                start: new Date("2024-10-24T08:00:00"), // 08:00
                name: "System Analyst",
                priority: 'low',
                duration: 600, // 10 giờ
                isAllDay: false
            }
        ]
    },
    {
        id: 'day-5',
        date: new Date("2024-10-25"), // 25/10/2024
        events: [
            {
                id: 'job-8',
                start: new Date("2024-10-25T10:00:00"), // 10:00
                name: "Data Engineer",
                priority: 'medium',
                duration: 300, // 5 giờ
                isAllDay: false
            }
        ]
    }
];

function App(): React.JSX.Element {
    const [eventsJob, setEventsJob] = useState([]);
    const [data, setData] = useState([]); // Thêm state cho data

    const fetchData = async () => {
        const url = 'https://office.spsvn.com/api/Booking/GetByBKGroup/11';
        const token = 
'eyJ0eXAiOiJKV1QiLCJub25jZSI6IkZqY2VNZEw3Wk5pczBKLVN5TkhYc1picWRKcndoUGpGR0UtSnpsOU9PMU0iLCJhbGciOiJSUzI1NiIsIng1dCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCIsImtpZCI6IjNQYUs0RWZ5Qk5RdTNDdGpZc2EzWW1oUTVFMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iZDZhMjEwNS03NDM3LTQxNGUtYWI0Zi01YTE3MDFiMTYwMTkvIiwiaWF0IjoxNzMxMDMyMzIyLCJuYmYiOjE3MzEwMzIzMjIsImV4cCI6MTczMTAzNjUwNiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhZQUFBQXFBYmxvRzVsK2N1L2I3aUNHZUllOWxQeXN0S2tuMU5VNFF6Tjk5Ym0vU1VtdXdZTXM3VWtadzFVRTRoMkZtS1oiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IlNQMzY1IiwiYXBwaWQiOiI0YTE3YzJlMi0yMDEyLTQ1ZDAtOGJmMy00YTFjOTlkMGYyYjMiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ik5ndXnhu4VuIFF1YW5nIiwiZ2l2ZW5fbmFtZSI6Ik1pbmgiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMjMuMTcuMTUxLjUyIiwibmFtZSI6Ik5ndXnhu4VuIFF1YW5nIE1pbmgiLCJvaWQiOiIwODMxNDcwMS1hNTUxLTRiYmQtYWJmNy0yZWI2MzgwOTRkN2QiLCJwdWlkIjoiMTAwMzIwMDNEOTk2RDdGRiIsInJoIjoiMS5BVDRBQlNGcXZUZDBUa0dyVDFvWEFiRmdHUU1BQUFBQUFQRVB6Z0FBQUFBQUFBQS1BTW8tQUEuIiwic2NwIjoiQWxsU2l0ZXMuRnVsbENvbnRyb2wgQWxsU2l0ZXMuTWFuYWdlIENhbGVuZGFycy5SZWFkV3JpdGUgVXNlci5SZWFkIiwic2lkIjoiMWY3ODcxYzItOWQ4ZS00OWJlLWIzYzItZTU4NTk5MjNiZDg2Iiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiNjZNTlQ4RlE1ZXJScHQ1aGY3U3R2TjhrYXhYMjJUUnZXUHFDbjdkU0JwZyIsInRpZCI6ImJkNmEyMTA1LTc0MzctNDE0ZS1hYjRmLTVhMTcwMWIxNjAxOSIsInVuaXF1ZV9uYW1lIjoibWluaG5xQHNwc3ZuLmNvbSIsInVwbiI6Im1pbmhucUBzcHN2bi5jb20iLCJ1dGkiOiJhM3ZwMjRjZk1FU2oybG9qSjVjVUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMTQgMSIsInhtc19wZnRleHAiOjE3MzExMjI5MDZ9.XHOMlmLDVN_q5UiVcDUfWpP3ZHgzObnWKtzQBQFJ-wYRv264sIxubItXf9EE6_K-8AlAptYXF8PaXXWMaNXnRjsy2WPGc_UwRgOjLBx3atrS-LezX6caeZM13acHEHjVqcZDj7_UcOc4_QoHyS0a-jjDKPXK9qzULrYKsyGvdm56jRHLKft_fZOK2BwXQ_FKm-vJzcbQlA3JuntT6u_ppFMIDan-EuFn3EuyGywWVes8P1Tz-mhncbWY52E22AVpvqnbWfEH2gyH81mKCWWmB9I6zXHsRwZqxvs_9pB-6Rn95Nxh-Ci_HNQTnONae5pXjtdBrBha8SnDjFtJZ-ilWA'
        const requestBody = {
            MetaData: "",
            OrderBy: "StartTime",
            OrderByDescending: true,
            OrderDate: "",
            Page: 1,
            PageSize: 999,
            fillter: {
                Assignor: [],
                Department: [],
                EndDate: "2024-11-30T16:59:59.999Z",
                Priority: [],
                StartDate: "2024-10-31T17:00:00.000Z",
                Status: []
            },
            q: ""
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Response:', errorData);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const dataList = data.data.DataList;
            console.log("hjj",data);
            
            console.log("kkj",dataList);
            

            // Cập nhật state data với dữ liệu nhận được
            setData(dataList); // Lưu dữ liệu vào state

            const eventsJobData = dataList.map(item => {
                const createdDate = moment(item.Created).startOf('day');
                const datePart = createdDate.format('YYYY-MM-DD');
                console.log("sfg",new Date(datePart));
                

                return {
                    id: item.ID.toString(),
                    date: new Date(datePart),
                    events: [
                        {
                            id: item.ID.toString(),
                            start: new Date(item.StartTime),
                            name: item.Title,
                            priority: "medium",
                            duration: Math.floor(item.Duration),
                            isAllDay: item.Duration === 24
                        }
                    ]
                };
            });

            eventsJobData.forEach(eventJob => {
                console.log(`Events for date ${eventJob.date}:`, eventJob.events);
            });

            setEventsJob(eventsJobData);
            console.log("Events:", eventsJobData);

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Gọi fetchData khi component được mount
    useEffect(() => {
        fetchData();
    }, []);

    
    // Mảng rỗng để chỉ gọi một lần
    eventsJob.forEach(eventJob => {
        console.log("Event Date:", eventJob.date); // Log giá trị date
        
        eventJob.events.forEach(event => {
            console.log("Event Start Time:", event.start); // Log thời gian bắt đầu cho mỗi sự kiện
        });
    });

    const eventsJobData = [
        {
            date: new Date("2024-10-29"), // Chuỗi hoặc đối tượng Date
            events: [
                {
                    id: "72",
                    start: new Date("2024-10-30T17:00:00Z"), // Thời gian bắt đầu là đối tượng Date
                    name: "Test điều phối",
                    priority: "medium",
                    duration: 24, // Số nguyên
                    isAllDay: true // Boolean
                }
            ]
        }
    ];
    
    
    console.log("Events for calendar:", eventsJobData);
    // In ra toàn bộ sự kiện
    console.log("Events:11", eventsJob);
    return (
        <View style={{ flex: 1 }}>
            <RtnCalendar events={eventsJob} />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default App;
