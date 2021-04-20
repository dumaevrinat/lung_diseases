import React from 'react'
import {makeStyles} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from 'recharts'

const useStyles = makeStyles((theme) => ({
    root: {},
    legendText: {
        fontFamily: theme.typography.subtitle2.fontFamily,
        fontSize: theme.typography.subtitle2.fontSize,
        fontWeight: theme.typography.subtitle2.fontWeight,
        color: theme.palette.text.primary
    }
}))

const PredictionChart = () => {
    const classes = useStyles()

    const colors = ['#6200EA', '#B140CB', '#FF80AB']

    const transformFilesData = (files, labels) => {
        return Object.values(
            files.map((file) =>
                labels[file.probability.indexOf(Math.max(...file.probability))]
            ).filter((label) =>
                label !== undefined
            )
            .reduce((result, label) => {
                result[label] = result[label] || {name: label, value: 0}
                result[label].value++

                return result
            }, {}),
        )
    }

    const filesData = useSelector(state =>
        transformFilesData(state.xrays.files, state.xrays.labels)
    )


    const legendText = (value, entry) => {
        return <span className={classes.legendText}>
            {value}
        </span>
    }

    return (
        <ResponsiveContainer className={classes.root}>
            <PieChart>
                <Pie
                    dataKey='value'
                    data={filesData}
                    cx='50%'
                    cy='50%'
                    innerRadius='60%'
                    outerRadius='80%'
                    cornerRadius={5}
                    paddingAngle={5}
                    legendType='circle'
                >
                    {filesData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Legend align='center' formatter={legendText}/>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PredictionChart