import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from 'recharts'
import {grey} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    chart: {
        display: 'flex',
        alignSelf: 'center',
        maxWidth: 300,
    },
    legendText: {
        fontFamily: theme.typography.subtitle2.fontFamily,
        fontSize: theme.typography.subtitle2.fontSize,
        fontWeight: theme.typography.subtitle2.fontWeight,
        color: theme.palette.text.primary,
    },
    label: {
        fontFamily: theme.typography.body1.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
    },
}))

const PredictionChart = () => {
    const classes = useStyles()

    const colors = ['#B140CB', '#D860BB', '#FF80AB']

    const transformFilesData = (files, labels) => {
        return Object.values(
            files.map((file) =>
                labels[file.probability.indexOf(Math.max(...file.probability))],
            ).filter((label) =>
                label !== undefined,
            ).reduce((result, label) => {
                result[label] = result[label] || {name: label, value: 0}
                result[label].value++

                return result
            }, {}),
        )
    }

    const filesData = useSelector(state => transformFilesData(state.xrays.files, state.xrays.labels))

    const emptyFilesData = [{name: '', value: 1}]

    const legendText = (value, entry) => {
        return <span className={classes.legendText}>{value}</span>
    }

    const label = ({cx, cy, midAngle, innerRadius, outerRadius, value}) => {
        const RADIAN = Math.PI / 180
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text className={classes.label} x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
                {value}
            </text>
        )
    }

    return (
        <div className={classes.root}>
            {filesData.length === 0 &&
            <Typography>
                Upload X-Ray <br/>to get prediction statistics
            </Typography>
            }
            <ResponsiveContainer className={classes.chart} width='100%' aspect={1}>
                <PieChart>
                    <Pie
                        dataKey='value'
                        data={filesData.length !== 0 ? filesData : emptyFilesData}
                        cx='50%'
                        cy='50%'
                        innerRadius='68%'
                        outerRadius='90%'
                        cornerRadius={5}
                        paddingAngle={5}
                        labelLine={false}
                        label={filesData.length !== 0 && label}
                    >
                        {filesData.length !== 0 ?
                            filesData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />))
                            :
                            emptyFilesData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={grey[300]}
                                />))
                        }
                    </Pie>
                    {filesData.length !== 0 &&
                    <Legend
                        align='center'
                        iconType='circle'
                        formatter={legendText}
                    />
                    }
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PredictionChart
