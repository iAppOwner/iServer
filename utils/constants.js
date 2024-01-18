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
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
      },
      {
        name : 'D.O.B',
        type : 'date',
        title : true,
        icon : 'calendar',
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
      },
      {
        name : 'Aadhar Card',
        type : 'file',
        title : true,
        icon : 'file',
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
      },
      // {
      //   name : 'PAN Card',
      //   type : 'file',
      //   title : true,
      //   icon : 'file',
      //   status : '',
      //   value : '',
      //   mandate : true,
      //   comments : ''
      // },
      {
        name : 'Payment',
        type : 'payment',
        title : true,
        icon : 'credit-card',
        amount : '2000',
        currency : 'RS',
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
      },
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
        type : 'radio',
        name : "Willing to Join",
        title : true,
        status : 'upending',
        radios : [{
          label : "Yes",
          value : "Yes"
        },
        {
          label : "No",
          value : "No"
        },
      ],
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