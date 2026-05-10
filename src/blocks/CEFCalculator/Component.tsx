'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  cefBalance: number
  tuitionFee: number
}

const MAX_PART1_SUBSIDY = 10000
const MAX_PART2_SUBSIDY = 15000
const MAX_TOTAL_SUBSIDY = MAX_PART1_SUBSIDY + MAX_PART2_SUBSIDY

const formatHKD = (n: number) =>
  new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD' }).format(n)

export const CEFCalculatorBlock: FC<{
  id?: string
  className?: string
}> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const [result, setResult] = useState<{
    part1Subsidy: number
    part2Subsidy: number
    remainingBalance: number
    userTuitionFee: number
  } | null>(null)

  const calculateSubsidy = (data: FormValues) => {
    const { cefBalance, tuitionFee } = data

    const usedSubsidy = MAX_TOTAL_SUBSIDY - cefBalance
    const usedPart1Subsidy = Math.min(usedSubsidy, MAX_PART1_SUBSIDY)
    const remainingPart1Subsidy = MAX_PART1_SUBSIDY - usedPart1Subsidy
    const usedPart2Subsidy = usedSubsidy - usedPart1Subsidy
    const remainingPart2Subsidy = MAX_PART2_SUBSIDY - usedPart2Subsidy

    let remainingBalance = cefBalance
    let part1Subsidy = 0
    let part2Subsidy = 0

    const maxPart1Tuition = remainingPart1Subsidy / 0.8
    const part1Tuition = Math.min(tuitionFee, maxPart1Tuition)
    const part1CefUsage = Math.min(remainingPart1Subsidy, part1Tuition * 0.8)
    part1Subsidy = part1CefUsage
    remainingBalance -= part1CefUsage

    const remainingTuition = tuitionFee - part1Tuition
    const part2CefUsage = Math.min(remainingPart2Subsidy, remainingTuition * 0.6)
    part2Subsidy = part2CefUsage
    remainingBalance -= part2CefUsage

    const userTuitionFee = tuitionFee - (part1Subsidy + part2Subsidy)

    setResult({ part1Subsidy, part2Subsidy, remainingBalance, userTuitionFee })
  }

  return (
    <div className={cn('mx-auto my-8 w-full max-w-xl', className)}>
      <div className="rounded-xl border border-border bg-card p-6 shadow-lift-1 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary md:text-2xl">CEF 計算器</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            計算持續進修基金可資助的金額及您需要支付的學費。
          </p>
        </div>

        <form onSubmit={handleSubmit(calculateSubsidy)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cefBalance">CEF 帳戶餘額 (0 – {formatHKD(MAX_TOTAL_SUBSIDY)})</Label>
            <Input
              id="cefBalance"
              type="number"
              {...register('cefBalance', {
                required: '請輸入 CEF 帳戶餘額。',
                min: { value: 0, message: 'CEF 帳戶餘額必須至少為 $0。' },
                max: {
                  value: MAX_TOTAL_SUBSIDY,
                  message: `CEF 帳戶餘額不得超過 ${formatHKD(MAX_TOTAL_SUBSIDY)}。`,
                },
              })}
            />
            {errors.cefBalance && <p className="text-sm text-error">{errors.cefBalance.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tuitionFee">學費</Label>
            <Input
              id="tuitionFee"
              type="number"
              {...register('tuitionFee', {
                required: '請輸入學費。',
                min: { value: 1, message: '學費必須大於 0。' },
              })}
            />
            {errors.tuitionFee && <p className="text-sm text-error">{errors.tuitionFee.message}</p>}
          </div>

          <div className="flex justify-end pt-1">
            <Button type="submit" className="w-full sm:w-auto">
              計算
            </Button>
          </div>
        </form>

        {result && (
          <div className="mt-6 rounded-lg bg-muted/60 p-5">
            <h3 className="mb-4 border-b border-border/60 pb-2 text-base font-semibold text-foreground">
              計算結果
            </h3>
            <dl className="flex flex-col gap-3">
              <ResultRow label="第一部分補貼" value={formatHKD(result.part1Subsidy)} />
              <ResultRow label="第二部分補貼" value={formatHKD(result.part2Subsidy)} />
              <ResultRow
                label="總補貼"
                value={formatHKD(result.part1Subsidy + result.part2Subsidy)}
                emphasis
              />
              <ResultRow label="CEF 剩餘餘額" value={formatHKD(result.remainingBalance)} />
              <ResultRow
                label="您需要支付的學費"
                value={formatHKD(result.userTuitionFee)}
                emphasis
              />
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}

const ResultRow: FC<{ label: string; value: string; emphasis?: boolean }> = ({
  label,
  value,
  emphasis,
}) => (
  <div className="flex items-baseline justify-between gap-4 text-sm">
    <dt className="text-muted-foreground">{label}</dt>
    <dd className={cn('font-medium tabular-nums', emphasis ? 'text-secondary' : 'text-foreground')}>
      {value}
    </dd>
  </div>
)
