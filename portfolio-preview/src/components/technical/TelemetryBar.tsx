"use client";

import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid } from "@/once-ui/components";

export function TelemetryBar() {
    const [latency, setLatency] = useState(24);
    const [qps, setQps] = useState(1420);
    const [cpuLoad, setCpuLoad] = useState(18);
    const [memoryUsage, setMemoryUsage] = useState(42);

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(20 + Math.random() * 8));
            setQps(Math.floor(1400 + Math.random() * 80));
            setCpuLoad(Math.floor(15 + Math.random() * 10));
            setMemoryUsage(Math.floor(40 + Math.random() * 5));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Grid columns="4" mobileColumns="2" gap="m" fillWidth style={{ marginTop: '16px' }}>
            <Flex
                direction="column"
                padding="m"
                radius="m"
                gap="4"
                style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Text variant="code-default-xs" onBackground="neutral-weak">LATENCY (RTT)</Text>
                <Flex align="center" gap="8">
                    <Text variant="heading-strong-s" style={{ color: '#38bdf8' }}>{latency} ms</Text>
                    <span style={{ fontSize: '10px', color: '#00FF9D' }}>● 100% HEALTH</span>
                </Flex>
            </Flex>

            <Flex
                direction="column"
                padding="m"
                radius="m"
                gap="4"
                style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Text variant="code-default-xs" onBackground="neutral-weak">THROUGHPUT (QPS)</Text>
                <Flex align="center" gap="8">
                    <Text variant="heading-strong-s" style={{ color: '#38bdf8' }}>{qps.toLocaleString()} / sec</Text>
                </Flex>
            </Flex>

            <Flex
                direction="column"
                padding="m"
                radius="m"
                gap="4"
                style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Text variant="code-default-xs" onBackground="neutral-weak">CPU LOAD</Text>
                <Flex align="center" gap="8">
                    <Text variant="heading-strong-s" style={{ color: '#38bdf8' }}>{cpuLoad}%</Text>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${cpuLoad}%`, height: '100%', background: '#38bdf8', transition: 'width 0.5s ease' }} />
                    </div>
                </Flex>
            </Flex>

            <Flex
                direction="column"
                padding="m"
                radius="m"
                gap="4"
                style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Text variant="code-default-xs" onBackground="neutral-weak">HEAP ALLOCATION</Text>
                <Flex align="center" gap="8">
                    <Text variant="heading-strong-s" style={{ color: '#38bdf8' }}>{memoryUsage}%</Text>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${memoryUsage}%`, height: '100%', background: '#818cf8', transition: 'width 0.5s ease' }} />
                    </div>
                </Flex>
            </Flex>
        </Grid>
    );
}
