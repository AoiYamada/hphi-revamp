'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  cefBalance: number
  tuitionFee: number
}

const MAX_PART1_SUBSIDY = 10000
const MAX_PART2_SUBSIDY = 15000
const MAX_TOTAL_SUBSIDY = MAX_PART1_SUBSIDY + MAX_PART2_SUBSIDY

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

    // Determine remaining part1 and part2 subsidy from cefBalance
    const usedSubsidy = MAX_TOTAL_SUBSIDY - cefBalance
    const usedPart1Subsidy = Math.min(usedSubsidy, MAX_PART1_SUBSIDY)
    const remainingPart1Subsidy = MAX_PART1_SUBSIDY - usedPart1Subsidy

    const usedPart2Subsidy = usedSubsidy - usedPart1Subsidy
    const remainingPart2Subsidy = MAX_PART2_SUBSIDY - usedPart2Subsidy

    let remainingBalance = cefBalance
    let part1Subsidy = 0
    let part2Subsidy = 0

    // First part calculation
    const maxPart1Tuition = remainingPart1Subsidy / 0.8
    const part1Tuition = Math.min(tuitionFee, maxPart1Tuition)
    const part1CefUsage = Math.min(remainingPart1Subsidy, part1Tuition * 0.8)
    part1Subsidy = part1CefUsage
    remainingBalance -= part1CefUsage

    // Second part calculation
    const remainingTuition = tuitionFee - part1Tuition
    const part2CefUsage = Math.min(remainingPart2Subsidy, remainingTuition * 0.6)
    part2Subsidy = part2CefUsage
    remainingBalance -= part2CefUsage

    const userTuitionFee = tuitionFee - (part1Subsidy + part2Subsidy)

    setResult({
      part1Subsidy,
      part2Subsidy,
      remainingBalance,
      userTuitionFee,
    })
  }

  return (
    <div className={className}>
      <h2 className="text-xl font-bold mb-4">CEF 計算器</h2>
      <form onSubmit={handleSubmit(calculateSubsidy)} className="space-y-6 max-w-xs">
        <div className="space-y-2">
          <Label htmlFor="cefBalance">CEF 帳戶餘額 (0-{MAX_TOTAL_SUBSIDY}):</Label>
          <Input
            id="cefBalance"
            type="number"
            className="max-w-xs"
            {...register('cefBalance', {
              required: '請輸入 CEF 帳戶餘額。',
              min: { value: 0, message: 'CEF 帳戶餘額必須至少為 $0。' },
              max: {
                value: MAX_TOTAL_SUBSIDY,
                message: `CEF 帳戶餘額不得超過 $${MAX_TOTAL_SUBSIDY}。`,
              },
            })}
          />
          {errors.cefBalance && (
            <p className="text-red-500 text-sm mt-1">{errors.cefBalance.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tuitionFee">學費:</Label>
          <Input
            id="tuitionFee"
            type="number"
            className="max-w-xs"
            {...register('tuitionFee', {
              required: '請輸入學費。',
              min: { value: 1, message: '學費必須大於 0。' },
            })}
          />
          {errors.tuitionFee && (
            <p className="text-red-500 text-sm mt-1">{errors.tuitionFee.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">
            計算
          </Button>
        </div>
      </form>
      {result && (
        <div className="mt-6 p-4 border rounded-md shadow-sm space-y-4 max-w-xs">
          <h3 className="text-lg font-semibold border-b pb-2">計算結果</h3>
          <div className="space-y-2">
            <div>
              <Label className="block">第一部分補貼:</Label>
              <p className="text-sm">${result.part1Subsidy.toFixed(2)}</p>
            </div>
            <div>
              <Label className="block">第二部分補貼:</Label>
              <p className="text-sm">${result.part2Subsidy.toFixed(2)}</p>
            </div>
            <div>
              <Label className="block">總補貼:</Label>
              <p className="text-sm">${(result.part1Subsidy + result.part2Subsidy).toFixed(2)}</p>
            </div>
            <div>
              <Label className="block">CEF 剩餘餘額:</Label>
              <p className="text-sm">${result.remainingBalance.toFixed(2)}</p>
            </div>
            <div>
              <Label className="block">您需要支付的學費:</Label>
              <p className="text-sm">${result.userTuitionFee.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
