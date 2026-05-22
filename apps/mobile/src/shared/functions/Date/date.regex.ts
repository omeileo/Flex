export const dateFormatRegex = [
  // Date
  {
    regex:
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/,
    dateFormat: 'ISO 8601',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/,
    dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{2}$/,
    dateFormat: 'yyyy-MM-dd HH:mm:ss.SS',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{1}$/,
    dateFormat: 'yyyy-MM-dd HH:mm:ss.S',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2}$/,
    dateFormat: 'yyyy-MM-dd',
  },

  {
    regex: /^\d{2}-\d{2}-\d{4}$/,
    dateFormat: 'dd-MM-yyyy',
  },

  {
    regex:
      /^(0?[1-9]|[12]\d|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/,
    dateFormat: 'dd-MMM-yyyy',
  },

  {
    regex: /^\d{2}\/\d{2}\/\d{4}$/,
    dateFormat: 'dd/MM/yyyy',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2}$/,
    dateFormat: 'yyyy-MM-dd',
  },

  {
    regex:
      /^(0?[1-9]|[12]\d|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/,
    dateFormat: 'EEE, dd MMM',
  },

  {
    regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
    dateFormat: "yyyy-MM-dd'T'HH:mm:ss",
  },

  {
    regex: /^PT(\d+H)?(\d+M)?$/,
    dateFormat: 'ISO 8601 duration',
  },

  {
    regex:
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/,
    dateFormat: 'MMMM d, yyyy',
  },

  {
    regex:
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},\s\d{4}$/,
    dateFormat: 'MMM d, yyyy',
  },

  // Time
  {
    regex:
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/,
    dateFormat: 'MMMM d, yyyy',
  },

  {
    regex: /^\d{2}:\d{2}:\d{2}\.\d{3}$/,
    dateFormat: 'HH:mm:ss.SSS',
  },

  {
    regex: /^\d{1,2}:\d{2}\s(?:AM|PM)$/i,
    dateFormat: 'h:mm a',
  },

  {
    regex: /^\d{2}:\d{2}$/,
    dateFormat: 'HH:mm',
  },
];

export const durationRegex =
  /(\d+)([yYaA])?(?:\s+)?(\d+)?([mMoO])?(?:\s+)?(\d+)?([dD])?(?:\s+)?(\d+)?([hH])?(?:\s+)?(\d+)?([mM])?(?:\s+)?(\d+)?([sS])?/;
