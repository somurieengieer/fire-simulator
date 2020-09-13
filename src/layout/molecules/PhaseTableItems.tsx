import React, {useEffect, useState} from 'react'
import {TableCell, TableHead, TableRow} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {theme} from '../materialui/theme'
import {PhaseClass, PhaseData} from '../../features/fire/Phase'
import {FirePattern, selectFirePatterns, selectPatternNumbers, updatePhases} from '../../features/fire/fireSlice'
import {useDispatch, useSelector} from 'react-redux'
import {createDataFromURL, PhasesTemplate, phasesTemplates} from '../../features/fire/fireInitialData'
import {numberFromHalfWidthToFullWidth} from '../../features/utils/Utils'
import {useLocation} from 'react-router'
import classNames from 'classnames'

export const usePatternTableStyles = makeStyles({
  table: {
    // width: 650,
  },
  tableCellLabel: {
    width: 200,
    minWidth: 140,
    backgroundColor: theme.palette.secondary.light
  },
  tableCell: {
    minWidth: 180,
    position: 'relative'
  },
  tableHeadRow: {
    backgroundColor: theme.palette.secondary.main
  },
  select: {
    height: '2em'
  },
  linkCell: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  input: {
    width: 120
  },
  inputError: {
    backgroundColor: theme.palette.error.main
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  toolTip: {
    maxWidth: 400,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 240
    }
  }
})

interface TablePatternHeaderSetProps {
  firePattern: FirePattern,
  colSpan: number,
}

export function TablePatternHeaderSet({firePattern, colSpan}: TablePatternHeaderSetProps) {
  const classes = usePatternTableStyles()

  const dispatch = useDispatch()
  const selectedPatternNumbers = useSelector(selectPatternNumbers)
  const selectedFirePatterns = useSelector(selectFirePatterns)
  const [templateIndex, setTemplateIndex] = useState<number>(0)
  const location = useLocation()
  const [templateOptions, setTemplateOptions] = useState<PhasesTemplate[]>([{label: '▼テンプレートを選択'}])

  const title = (): string => {
    return 'パターン' + numberFromHalfWidthToFullWidth(firePattern.patternNumber)
  }

  const copyPatternByPatternNumber = (patternNumber: number) => {
    const newPhases: PhaseData[] = JSON.parse(JSON.stringify(selectedFirePatterns[patternNumber - 1].phases))
    dispatch(updatePhases({
      patternNumber: firePattern.patternNumber,
      phases: newPhases
    }))
  }

  const copyPatternByTemplateNumber = (index: number) => {
    // @ts-ignore // 0の場合はcreatePhaseDataがないが、その場合は↑でreturnする
    if (!templateOptions[index].createPhaseData) return
    // @ts-ignore
    const phaseData = templateOptions[index].createPhaseData()
    if (!phaseData) return
    dispatch(updatePhases({
      patternNumber: firePattern.patternNumber,
      phases: phaseData
    }))
  }

  const updateTemplateIndex = () => {
    const getParams = new URLSearchParams(location.search)
    const templateIndexParam = getParams.get(`t${firePattern.patternNumber}`)

    let newIndex = 3
    switch (firePattern.patternNumber) {
      case 2:
        newIndex = 5
        break
      case 3:
        newIndex = 25
        break
    }

    if (templateIndexParam &&
      Number(templateIndexParam) >= 0 &&
      Number(templateIndexParam) < templateOptions.length) {
      newIndex = Number(templateIndexParam)
    }
    setTemplateIndex(newIndex)
  }

  const updateTemplateIndexForPData = () => {
    setTemplateIndex(phasesTemplates(true).length - (3 - firePattern.patternNumber))
  }

  // 個人データを表示するモード
  const isPDataMode = (): boolean => {
    const getParams = new URLSearchParams(location.search)
    return Boolean(getParams.get('pData'))
  }

  // Getパラメータにデータを含む場合
  const isTDataMode = (): boolean => {
    const getParams = new URLSearchParams(location.search)
    return Boolean(Array.from(getParams.keys()).find(k => (/^p\d/).test(k)))
  }

  const updateFromTData = () => {
    const getParams = new URLSearchParams(location.search)
    const patternNumber = firePattern.patternNumber
    // [1, 2, 3].forEach(patternNumber => {
    // Array.from(getParams.keys()).filter(k => (new RegExp(`^p${patternNumber}`)).test(k))
    const nowAge = getParams.get(`p${patternNumber}nowAge`)
    const retirementAllowance = getParams.get(`p${patternNumber}retirementAllowance`)
    const income = getParams.get(`p${patternNumber}income`)
    const annuity = getParams.get(`p${patternNumber}annuity`)
    if (nowAge || retirementAllowance || income) {
      const newData = createDataFromURL({
        nowAge: Number(nowAge || ''),
        retirementAllowance: Number(retirementAllowance || ''),
        income: Number(income || ''),
        annuity: Number(annuity || '')
      })
      dispatch(updatePhases({
        patternNumber: firePattern.patternNumber,
        phases: newData
      }))
    }
    // })
  }

  const updateTemplateOptions = () => {
    setTemplateOptions([
      {label: '▼テンプレートを選択'},
      ...phasesTemplates(isPDataMode())
    ])
    if (isPDataMode()) {
      setTemplateIndex(-1)
    }
  }

  // 以下のuseEffectは上から順に動く
  useEffect(() => {
    updateTemplateOptions()
    if (isTDataMode()) {
      updateFromTData()
    }
  }, [location])

  useEffect(() => {
    if (isTDataMode()) {
      return
    }

    if (isPDataMode()) {
      updateTemplateIndexForPData()
    } else {
      updateTemplateIndex()
    }
  }, [templateOptions])

  useEffect(() => {
    copyPatternByTemplateNumber(templateIndex)
  }, [templateIndex])

  return (
    <TableHead>
      <TableRow className={classes.tableHeadRow}>
        <TableCell colSpan={colSpan}>
          {title()}&nbsp;
          <select value={templateIndex}
                  onChange={v => setTemplateIndex(Number(v.target.value))}
                  className={classes.select}>
            {templateOptions.map((o, i) => (
              <option value={i} key={i}>{o.label}</option>
            ))}
          </select>
          {selectedPatternNumbers?.filter((i: number) => i !== firePattern.patternNumber).map((i: number) => (
            <button onClick={() => copyPatternByPatternNumber(i)}
                    key={i}>パターン{numberFromHalfWidthToFullWidth(i)}からコピー</button>
          ))}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export function SubHeaderRowSet({title, colSpan}
                                  : { title: string, colSpan: number }) {
  const classes = usePatternTableStyles()
  return (
    <TableRow className={classes.tableHeadRow}>
      <TableCell colSpan={colSpan}>
        {title}
      </TableCell>
    </TableRow>
  )
}

export function TableRowSet({rowLabel, phaseClasses, valueCallback, onChange, disabledCallback, isTypeString, validate}
                              : {
  rowLabel: string,
  phaseClasses: PhaseClass[],
  valueCallback(phaseClass: PhaseClass): string | number,
  onChange(newValue: string, index: number): void,
  disabledCallback?(phaseClass: PhaseClass): boolean,
  isTypeString?: boolean,
  validate?(phaseClass: PhaseClass): boolean,
}) {
  const disabled = (phaseClass: PhaseClass) => disabledCallback && disabledCallback(phaseClass)

  const showValue = (phase: PhaseClass): string | number => {
    return disabled(phase) ? Number(valueCallback(phase))?.toFixed(0) : valueCallback(phase)
  }

  const classes = usePatternTableStyles()
  return (
    <TableRow>
      <TableCell className={classes.tableCellLabel} component="th" scope="row">
        {rowLabel}
      </TableCell>
      {phaseClasses.map((phase: PhaseClass, i: number) => (
        <TableCell className={classes.tableCell} align="center" key={i}>
          <input value={showValue(phase)}
                 type={isTypeString ? 'string' : 'number'}
                 onChange={v => onChange(v.target.value, i)}
                 disabled={disabled(phase)}
                 className={classNames(classes.input, {[classes.inputError]: validate && validate(phase)})}
          />
        </TableCell>
      ))}
      <EmptyTableCell/>
    </TableRow>
  )
}

export function EmptyTableCell() {
  return (
    <TableCell width={10}>
    </TableCell>
  )
}
