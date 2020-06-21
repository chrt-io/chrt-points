# Random ideas

### Framework
`chrt.io` e' un framework di grafici. Puo' essere usato da un developer per creare grafici il cui codice viene usato per creare ogni tipo di grafici supportato

### Independent charts
`chrt.io` offre singoli tipi di grafici. Il developer importa il componente del grafico che vuole usare, passa i dati, lo stile e funzioni di supporto (data parsing, callbacks...).
```
import lineChrt from 'chrt-linechart';
...
new lineChrt()
      .data(data)
      .style(style)
...
```

```
import LineChrt from 'react-chrt-linechart';
...
<LineChrt data={data} style={style} />
...
```

## Our charts
Quanto e' atomico un chrt? Ad esempio: bar chart -> vertical vs horizontal, sono due grafici o e' lo stesso?

#### Line charts

#### Bar charts
*  Basic
*  Horizontal
*  Stacked

#### Area charts
*  Basic
*  Stacked

#### Pie charts

#### Scatterplot


## Business model

### Atomicity

*  Ogni grafico esiste in modo indipendente

### Open source
*  opzione 1: open source - codice disponibile ed aperto a collaboratori -> Community di collaboratori
*  opzione 2: open source - il codice e' online, puo' essere visto, forkato e usato -> No community, solo commenti e issue aperte

### License
*  Free for non-commercial use
*  One-off license per tutto
*  Ogni grafico

### Subscription

### Pricing
