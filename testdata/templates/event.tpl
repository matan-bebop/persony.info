[
    '{{repeat(50, 70)}}',
    {
        "start": "{{date(YYYY-MM-dd)}}",
        "dailyOrder":"{{numeric(0,50)}}",
        "priority": "{{numeric(0,100)}}",
        "title": "{{lorem(3)}}",
        "fulltext": "{{lorem(1,paragraphs)}}",
        "sources": [
            '{{repeat(3)}}',
            {
                title: '{{lorem(3)}}',
                link: '/#'
            }
        ],
        "group": "{{randomGroup()}}",
        "type": "{{randomArrayItem()}}",
         randomArrayItem: function(idx) {
            var choices = ['biography', 'operating', 'global'];
            return choices[this.numeric(0, choices.length - 1)];
        },
        randomGroup: function(idx) {
            var choices = ['Biography', 'Operating', 'Global'];
            return choices[this.numeric(0, choices.length - 1)];
        }
        
    }
]