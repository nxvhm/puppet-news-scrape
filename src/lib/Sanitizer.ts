class Sanitizer {


    static sanitizeTitle(title:string):string {
        return title.replace(/(?:\r\n|\r|\n)/g, '').trim();
    }

    static sanitizeText(text:string):string {
        return text.replace(/(?:\r\n|\r|\n)/g, '').trim();
    }

    static formatDateString(dateString:string):string{
        let date = new Date(dateString.trim());
  
        return [
          date.getFullYear(),
          date.getMonth()+1,
          date.getDate()
        ].join('-');
      }    
}

export default Sanitizer