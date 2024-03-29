const addTable = (container, tableName, keys, values, checked) => {
    const table = document.createElement('table')
    table.classList.add(tableName)
    const tr = document.createElement('tr')
    values.forEach((value, index) => {
        const spanTr = document.createElement('span')
        spanTr.classList.add('spanTr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        td1.innerText = keys[index]
        td2.innerText = checked ? value[1] : value[0]
        tr.appendChild(td1)
        tr.appendChild(td2)
        spanTr.appendChild(td1)
        spanTr.appendChild(td2)
        tr.appendChild(spanTr)
        table.appendChild(tr)
    })
    if (document.querySelector(`.${tableName}`))
        document.querySelector(`.${tableName}`).remove()
    document.getElementsByClassName(container)[0].append(table)
}

setInterval(() => {
    console.log('data reloaded')
    dataReload()
}, 1000 * 4)

let chart

let configuration = (keys, values, type) => {
    return {
        type: type,
        data: {
            labels: keys,
            datasets: [
                {
                    label: 'Number of clicks',
                    data: values.map(r => r[0]),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1.5
                }
            ]
        },
        options: {
            animation: {
                duration: 0
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            },
            maintainAspectRatio: false
        },
        plugins: {
            chartAreaBorder: {
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
                borderDashOffset: 2
            },
            legend: {
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    }
}
const dataReload = async () => {
    await fetch(
        'https://mr-retail-token.herokuapp.com/sendClicks?client_id=client1&password=password1'
    ).then(res =>
        res.json().then(r => {
            const keys = Object.keys(r)
            const values = Object.values(r)
            addTable('table1', 'tableMain', keys, values, false)
            addTable('table2', 'tableSide', keys, values, true)

            var ctx = document.getElementById('myChart').getContext('2d')
            if (chart) {
                chart.destroy()
                chart = new Chart(ctx, configuration(keys, values, 'bar'))
            } else {
                chart = new Chart(ctx, configuration(keys, values, 'bar'))
            }
        })
    )
}
dataReload()