import * as React from 'react';
import {
    DonutChart,
    IChartProps,
    IChartDataPoint,
} from '@fluentui/react-charting';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react';
import { useState, useEffect } from 'react';
import { IDataChart } from '../../model/IDataChart';

export interface IChartCustonProps {
    data: IDataChart[]
}

export interface IChartCustonState {
    items?: IChartProps,
    total?: number
}

export function ChartCuston(props: IChartCustonProps) {
    const [state, setState] = useState<IChartCustonState>({items:{chartData: []}});

    useEffect(() => {
        if (!props.data || props.data.length === 0)
            return;
        setState({
            items: generateChartProps(),
            total: props.data.reduce((valorParcial, x) => valorParcial + x.data, 0)
        })
    }, [props.data]);

    const generateChartProps = () => {
        let points: IChartDataPoint[] = [];

        props.data.forEach(x => {
            points.push({
                legend: x.label,
                data: x.data,
                color: x.color,

            })
        });
        const data: IChartProps = { chartData: points };
        return data;
    }


    return (
        <Stack tokens={{ padding: "7px" }}>
            <Text variant='xLarge' style={{ marginBottom: "7px" }}>Origem Capital</Text>
            {state.items &&
                <DonutChart
                    data={state.items}
                    innerRadius={55}
                    legendsOverflowText={'overflow Items'}
                    hideLegend={true}
                    height={220}
                    width={176}
                    valueInsideDonut={state.total}
                    styles={{ root: { alignContent: "start", alignItems: "start" } }}
                />
            }
        </Stack>
    );
}