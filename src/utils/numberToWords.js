// src/utils/numberToWords.js

const defaultText = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

const readGroupOfThree = (group) => {
    let result = '';
    const hundred = Math.floor(group / 100);
    const ten = Math.floor((group % 100) / 10);
    const unit = group % 10;

    if (hundred === 0 && ten === 0 && unit === 0) return '';

    result += defaultText[hundred] + ' trăm ';

    if (ten > 1) {
        result += defaultText[ten] + ' mươi ';
    } else if (ten === 1) {
        result += 'mười ';
    } else if (hundred > 0 && unit > 0) {
        result += 'linh ';
    }

    if (unit > 0) {
        if (ten > 1 && unit === 1) {
            result += 'mốt';
        } else if (ten === 1 && unit === 5) {
            result += 'lăm';
        } else if (ten > 0 && unit === 5) {
             result += 'lăm';
        }
        else if (unit === 4 && ten > 1) {
             result += 'tư';
        }
        else {
            result += defaultText[unit];
        }
    }
    
    return result.trim().replace(/\s+/g, ' ');
};

export const numberToVietnameseWords = (number) => {
    if (number === null || number === undefined || isNaN(number)) return '';
    if (number === 0) return 'Không đồng.';

    if (Math.abs(number).toString().length > 15) {
        return 'Số quá lớn để chuyển đổi.';
    }

    let num = Math.floor(Math.abs(number));
    if (num === 0) return 'Không đồng.';

    let result = '';
    let i = 0;
    const units = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ'];

    while (num > 0) {
        const groupOfThree = num % 1000;
        if (groupOfThree > 0) {
            const groupText = readGroupOfThree(groupOfThree);
            result = groupText + (units[i] || '') + ' ' + result;
        }
        num = Math.floor(num / 1000);
        i++;
    }
    
    result = result.trim();
    if (!result) return 'Không đồng.';

    result = result.charAt(0).toUpperCase() + result.slice(1) + ' đồng.';
    return result.replace(/\s+/g, ' ').replace('trăm linh', 'trăm lẻ');
};
