import voucherService from "./../../src/services/voucherService.js"
import voucherRepository from "./../../src/repositories/voucherRepository.js";
import { jest } from "@jest/globals"
import exp from "constants";

describe("voucherService test suite", () => {
  it("should be always very positive", () => {
    expect("didi").toBe("didi");
  })


  it("should create the voucher", async () => {

    const code = "codigo";
    const discount = 50;

      jest.spyOn(voucherRepository, 'getVoucherByCode').mockImplementationOnce(() : any => {
        return null
      });

      jest.spyOn(voucherRepository, 'createVoucher').mockImplementationOnce(() : any => {
        return {
          code,
          discount
        }
      })

      await voucherService.createVoucher(code, discount);

      expect(voucherRepository.createVoucher).toHaveBeenCalledTimes(1);
  })

  // it("should not create the voucher", async () => {

  //   const code = "codigo";
  //   const discount = 50;

  //     jest.spyOn(voucherRepository, 'getVoucherByCode').mockImplementationOnce(() : any => {
  //       return {
  //         code,
  //         discount
  //       }
  //     });

  //     jest.spyOn(voucherRepository, 'createVoucher').mockImplementationOnce(() : any => {
  //       return {
  //         code,
  //         discount
  //       }
  //     })

  //     const promise = voucherService.createVoucher(code, discount);

  //     expect(promise).rejects.toBe()
  // })

    it("should apply the voucher", async () => {

    const code = "codigo";
    const discount = 50;
    const allowedAmountForDiscount = 120;
    const used = false;

      jest.spyOn(voucherRepository, 'getVoucherByCode').mockImplementationOnce(() : any => {
        return {
          code,
          discount,
          used
        }
      });

      jest.spyOn(voucherRepository, 'useVoucher').mockImplementationOnce(() : any => {
        return {
          code,
          discount,
          used: true
        }
      });
      const result = await voucherService.applyVoucher(code, allowedAmountForDiscount);

      expect(result.amount).toBe(allowedAmountForDiscount);
      expect(result.discount).toBe(discount);
      expect(result.applied).toBe(true);
      expect(result.finalAmount).toBe(allowedAmountForDiscount*discount/100)
  });

  it("should not apply the discount", async () => {

    const code = "codigo";
    const discount = 50;
    const lowerAmountForDiscount = 80;
    const used = false;

      jest.spyOn(voucherRepository, 'getVoucherByCode').mockImplementationOnce(() : any => {
        return {
          code,
          discount,
          used
        }
      });
      
      const result = await voucherService.applyVoucher(code, lowerAmountForDiscount);

      console.log(result);

      expect(result.amount).toBe(lowerAmountForDiscount);
      expect(result.discount).toBe(discount);
      expect(result.applied).toBe(false);
      expect(result.finalAmount).toBe(lowerAmountForDiscount)
  })

})


