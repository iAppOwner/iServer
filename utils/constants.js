exports.form = {
    formname : "Basic Form",
    sections : [
        {
    name : "Basic Details",
    fields : [
            {
        name : 'Full Name',
        type : 'text',
        title : true,
        icon : 'user',
        status : '',
        value : '',
        mandate : true,
        comments : ''
      },
      {
        name : 'Mobile',
        type : 'text',
        title : true,
        icon : 'mobile',
        status : '',
        value : '',
        mandate : true,
        comments : ''
      },
      {
        name : 'Aadhar Card',
        type : 'file',
        title : true,
        icon : 'file',
        status : '',
        value : '',
        mandate : true,
        comments : ''
      },
      {
        name : 'PAN Card',
        type : 'file',
        title : true,
        icon : 'file',
        status : '',
        value : '',
        mandate : true,
        comments : ''
      },
      // {
      //   name : 'Payment',
      //   type : 'payment',
      //   title : true,
      //   icon : 'credit-card',
      //   amount : '2000',
      //   currency : 'RS',
      //   status : '',
      //   value : '',
      //   mandate : true,
      //   comments : ''
      // },
      {
        name : 'Next',
      //   icon : 'floppy-disk',
        type : 'button',
      },
  ],
},
{
    name : "Feedback",
    fields : [
            {
        type : 'area',
        name : "Feedback",
        title : true,
        status : '',
        value : '',
        mandate : true,
        comments : ''
      },
      {
        name : 'Submit',
        type : 'sbutton',
      },
  ],
}
]
}